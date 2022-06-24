import path from 'path';
import semver from 'semver';
import chalk from 'chalk';
import findUp from 'find-up';
import inquirer from 'inquirer';

import { fetchConfigAtPath } from '@codeshift/fetcher';
import { PluginManager } from 'live-plugin-manager';
// @ts-ignore Run transform(s) on path https://github.com/facebook/jscodeshift/issues/398
import * as jscodeshift from 'jscodeshift/src/Runner';

import { Flags } from './types';
import { InvalidUserInputError } from './errors';
import { fetchPackageConfig } from './fetch-package';
import { getTransformPrompt } from './prompt';

export default async function main(paths: string[], flags: Flags) {
  const packageManager = new PluginManager({
    pluginsPath: path.join(__dirname, 'node_modules'),
  });

  let transforms: string[] = [];

  if (!flags.transform && !flags.packages) {
    console.log(
      chalk.green(
        'No transforms specified, attempting to find local codeshift.config file',
      ),
    );

    const configFilePath = await findUp([
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
      chalk.green('Found local codeshift.config file at:'),
      configFilePath,
    );

    const config = await fetchConfigAtPath(configFilePath);
    const answers = await inquirer.prompt([getTransformPrompt(config)]);

    if (config.transforms && config.transforms[answers.transform]) {
      transforms.push(config.transforms[answers.transform]);
    } else if (config.presets && config.presets[answers.transform]) {
      transforms.push(config.presets[answers.transform]);
    }
  }

  if (paths.length === 0) {
    throw new InvalidUserInputError(
      'No path provided, please specify which files your codemod should modify',
    );
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

      const config = await fetchPackageConfig(pkgName, packageManager);

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
        const res = await inquirer.prompt([getTransformPrompt(config)]);

        if (semver.valid(semver.coerce(res.transform))) {
          transformIds.push(res.transform);
        } else {
          presetIds.push(res.transform);
        }
      }

      // Get transform file paths
      if (config.transforms) {
        if (flags.sequence) {
          Object.entries(config.transforms as Record<string, string>)
            .filter(([key]) => semver.satisfies(key, `>=${transformIds[0]}`))
            .forEach(([, path]) => transforms.push(path));
        } else {
          Object.entries(config.transforms as Record<string, string>).forEach(
            ([id, path]) => {
              if (transformIds.includes(id)) {
                transforms.push(path);
              }
            },
          );
        }
      }

      // Get preset file paths
      if (config.presets) {
        Object.entries(config.presets as Record<string, string>).forEach(
          ([id, path]) => {
            if (presetIds.includes(id)) {
              transforms.push(path);
            }
          },
        );
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

    await jscodeshift.run(transform, paths, {
      verbose: flags.verbose,
      dry: flags.dry,
      print: true,
      babel: true,
      extensions: flags.extensions,
      ignorePattern: flags.ignorePattern,
      cpus: flags.cpus,
      ignoreConfig: [],
      runInBand: flags.runInBand,
      silent: false,
      parser: flags.parser,
      stdin: false,
    });
  }

  await packageManager.uninstallAll();
}
