import path from 'path';
import semver from 'semver';
import chalk from 'chalk';
import findUp from 'find-up';
import inquirer from 'inquirer';
import { PluginManagerOptions } from 'live-plugin-manager';

import * as core from '@hypermod/core';
import { fetchConfigAtPath } from '@hypermod/fetcher';

import { InvalidUserInputError } from './errors';
import { fetchPackages } from './utils/fetch-package';
import { mergeConfigs } from './utils/merge-configs';
import { fetchConfigsForWorkspaces, getPackageJson } from './utils/file-system';
import { getConfigPrompt, getMultiConfigPrompt } from './prompt';

export default async function main(
  paths: string[],
  flags: Partial<core.Flags>,
) {
  if (paths.length === 0) {
    throw new InvalidUserInputError(
      'No path provided, please specify which files your codemod should modify',
    );
  }

  const pluginManagerConfig: Partial<PluginManagerOptions> = {
    pluginsPath: path.join(__dirname, '..', 'node_modules'),
  };

  // If a registry is provided in the CLI flags, use it for the pluginManagers configuration.
  if (flags.registry !== undefined) {
    pluginManagerConfig.npmRegistryUrl = flags.registry;
  }

  // If a registryToken is provided in the CLI flags, use it as an authentication token for the pluginManager
  if (flags.registryToken !== undefined) {
    pluginManagerConfig.npmRegistryConfig = {
      auth: { token: flags.registryToken },
    };
  }

  let transforms: string[] = [];

  if (!flags.transform && !flags.packages) {
    console.log(
      chalk.green(
        'No transforms specified, attempting to find local hypermod.config file(s)',
      ),
    );

    /**
     * Attempt to locate a root package.json with a workspaces config.
     * If found, show a prompt with all available codemods
     */
    const localPackageJson = await getPackageJson();

    if (localPackageJson && localPackageJson.workspaces) {
      const configs = await fetchConfigsForWorkspaces(
        localPackageJson.workspaces,
      );
      const answers = await inquirer.prompt([getMultiConfigPrompt(configs)]);
      const selectedConfig = configs.find(
        ({ filePath }) => answers.codemod.filePath === filePath,
      );

      if (!selectedConfig) {
        throw new Error(
          `Unable to locate config at: ${answers.codemod.filePath}`,
        );
      }

      if (
        selectedConfig.config.transforms &&
        selectedConfig.config.transforms[answers.codemod.selection]
      ) {
        if (flags.sequence) {
          Object.entries(
            selectedConfig.config.transforms as Record<string, string>,
          )
            .filter(([key]) =>
              semver.satisfies(key, `>=${answers.codemod.selection}`),
            )
            .forEach(([, path]) => transforms.push(path));
        } else {
          transforms.push(
            selectedConfig.config.transforms[answers.codemod.selection],
          );
        }
      } else if (
        selectedConfig.config.presets &&
        selectedConfig.config.presets[answers.codemod.selection]
      ) {
        transforms.push(
          selectedConfig.config.presets[answers.codemod.selection],
        );
      }
    } else {
      /**
       * Otherwise, locate any config files in parent directories
       */
      const configFilePath = await findUp([
        'hypermod.config.js',
        'hypermod.config.ts',
        'hypermod.config.tsx',
        'src/hypermod.config.js',
        'src/hypermod.config.ts',
        'src/hypermod.config.tsx',
        'codemods/hypermod.config.js',
        'codemods/hypermod.config.ts',
        'codemods/hypermod.config.tsx',
        'codeshift.config.js',
        'codeshift.config.ts',
        'codeshift.config.tsx',
        'src/codeshift.config.js',
        'src/codeshift.config.ts',
        'src/codeshift.config.tsx',
        'codemods/codeshift.config.js',
        'codemods/codeshift.config.ts',
        'codemods/codeshift.config.tsx',
      ]);

      if (!configFilePath) {
        throw new InvalidUserInputError(
          'No transform provided, please specify a transform with either the --transform or --packages flags',
        );
      }

      console.log(
        chalk.green('Found local hypermod.config file at:'),
        configFilePath,
      );

      const config = await fetchConfigAtPath(configFilePath);
      const answers = await inquirer.prompt([getConfigPrompt(config)]);

      if (config.transforms && config.transforms[answers.codemod]) {
        Object.entries(config.transforms)
          .filter(([key]) => semver.satisfies(key, `>=${answers.codemod}`))
          .forEach(([, codemod]) =>
            transforms.push(`${configFilePath}@${codemod}`),
          );
      } else if (config.presets && config.presets[answers.codemod]) {
        transforms.push(`${configFilePath}#${answers.codemod}`);
      }
    }
  }

  if (flags.transform) {
    if (flags.transform.includes(',')) {
      flags.transform.split(',').forEach(t => transforms.push(t.trim()));
    } else {
      transforms.push(flags.transform);
    }
  }

  if (flags.packages) {
    const pkgs = flags.packages.split(',').filter(pkg => !!pkg);

    for (const pkg of pkgs) {
      const shouldPrependAtSymbol = pkg.startsWith('@') ? '@' : '';
      const pkgName =
        shouldPrependAtSymbol + pkg.split(/[@#]/).filter(str => !!str)[0];

      const rawTransformIds = pkg.split(/(?=[@#])/).filter(str => !!str);
      rawTransformIds.shift();

      const transformIds = rawTransformIds
        .filter(id => id.startsWith('@'))
        .map(id => id.substring(1))
        .sort((idA, idB) => {
          if (semver.lt(idA, idB)) return -1;
          if (semver.gt(idA, idB)) return 1;
          return 0;
        });

      const presetIds = rawTransformIds
        .filter(id => id.startsWith('#'))
        .map(id => id.substring(1));

      const { community, remote } = await fetchPackages(pkgName);

      const config = mergeConfigs(community, remote);

      // Validate transforms/presets
      transformIds.forEach(id => {
        if (!semver.valid(semver.coerce(id.substring(1)))) {
          throw new InvalidUserInputError(
            `Invalid version provided to the --packages flag. Unable to resolve version "${id}" for package "${pkgName}". Please try: "[scope]/[package]@[version]" for example @mylib/mypackage@10.0.0`,
          );
        }

        if (!config.transforms || !config.transforms[id]) {
          throw new InvalidUserInputError(
            `Invalid version provided to the --packages flag. Unable to resolve version "${id}" for package "${pkgName}"`,
          );
        }
      });

      presetIds.forEach(id => {
        if (!config.presets || !config.presets[id]) {
          throw new InvalidUserInputError(
            `Invalid preset provided to the --packages flag. Unable to resolve preset "${id}" for package "${pkgName}"`,
          );
        }
      });

      if (presetIds.length === 0 && transformIds.length === 0) {
        const res: { codemod: string } = await inquirer.prompt([
          getConfigPrompt(config),
        ]);

        if (semver.valid(semver.coerce(res.codemod))) {
          transformIds.push(res.codemod);
        } else {
          presetIds.push(res.codemod);
        }
      }

      // Get transform file paths
      if (config.transforms) {
        if (flags.sequence) {
          Object.entries(config.transforms)
            .filter(([key]) => semver.satisfies(key, `>=${transformIds[0]}`))
            .forEach(([, path]) => transforms.push(path));
        } else {
          Object.entries(config.transforms)
            .filter(([id]) => transformIds.includes(id))
            .forEach(([, path]) => transforms.push(path));
        }
      }

      // Get preset file paths
      if (config.presets) {
        Object.entries(config.presets)
          .filter(([id]) => presetIds.includes(id))
          .forEach(([, path]) => transforms.push(path));
      }
    }
  }

  if (!transforms.length) {
    throw new InvalidUserInputError(
      'Unable to locate transforms from provided flags.',
    );
  }

  // Dedupe transform array
  transforms = transforms.filter(
    (transform, i) => transforms.indexOf(transform) === i,
  );

  for (const transform of transforms) {
    console.log(chalk.green('Running transform:'), transform);

    await core.run(transform, paths, {
      verbose: flags.verbose,
      dry: flags.dry,
      print: false,
      babel: true,
      extensions: flags.extensions,
      ignorePattern: flags.ignorePattern,
      cpus: flags.cpus,
      ignoreConfig: [],
      runInBand: flags.runInBand,
      silent: false,
      parser: flags.parser,
      stdin: false,
      parserConfig: '',
      failOnError: false,
    });
  }
}
