import path from 'path';
import semver from 'semver';
import chalk from 'chalk';
import ora from 'ora';
import { PluginManager } from 'live-plugin-manager';
import merge from 'lodash/merge';
// @ts-ignore Run transform(s) on path https://github.com/facebook/jscodeshift/issues/398
import * as jscodeshift from 'jscodeshift/src/Runner';

import { fetchPackage, fetchRemotePackage } from '@codeshift/fetcher';
import { isValidConfig } from '@codeshift/validator';
import { CodeshiftConfig } from '@codeshift/types';

import { Flags } from './types';
import { InvalidUserInputError } from './errors';

function getCodeshiftPackageName(packageName: string) {
  return `@codeshift/mod-${packageName.replace('@', '').replace('/', '__')}`;
}

export default async function main(paths: string[], flags: Flags) {
  const packageManager = new PluginManager({
    pluginsPath: path.join(__dirname, '.plugin_packages'),
  });

  let transforms: string[] = [];

  if (!flags.transform && !flags.packages) {
    throw new InvalidUserInputError(
      'No transform provided, please specify a transform with either the --transform or --packages flags',
    );
  }

  if (paths.length === 0) {
    throw new InvalidUserInputError(
      'No path provided, please specify which files your codemod should modify',
    );
  }

  if (flags.transform) {
    if (flags.transform.includes(',')) {
      for (const t of flags.transform.split(',')) transforms.push(t.trim());
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

      let codeshiftConfig: CodeshiftConfig | undefined;
      let remoteConfig: CodeshiftConfig | undefined;

      const spinner = ora(
        `${chalk.green('Attempting to download package:')}, ${pkgName}`,
      ).start();

      try {
        codeshiftConfig = await fetchPackage(
          getCodeshiftPackageName(pkgName),
          packageManager,
        );
        spinner.succeed(
          `${chalk.green(
            `Found CodeshiftCommunity package: `,
          )} ${getCodeshiftPackageName(pkgName)}`,
        );
      } catch {
        spinner.warn(
          `${chalk.yellow(
            `Unable to locate CodeshiftCommunity package: `,
          )} ${getCodeshiftPackageName(pkgName)}`,
        );
      }

      try {
        remoteConfig = await fetchRemotePackage(pkgName, packageManager);
        spinner.succeed(
          `${chalk.green(`Found codeshift package: `)} ${pkgName}`,
        );
      } catch {
        spinner.warn(
          `${chalk.yellow(`Unable to locate codeshift package: `)} ${pkgName}`,
        );
      }

      if (!codeshiftConfig && !remoteConfig) {
        throw Error(`Unable to locate package from codeshift-community or NPM.
Make sure the package name "${pkgName}" is correct and try again.`);
      }

      const config: CodeshiftConfig = merge({}, remoteConfig, codeshiftConfig);

      if (!isValidConfig(config)) {
        throw Error(
          `Unable to locate a valid codeshift.config in package ${pkgName}`,
        );
      }

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
      for (const id of transformIds) {
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
      }

      for (const id of presetIds) {
        if (!config.presets || !config.presets[id]) {
          throw new InvalidUserInputError(
            `Invalid preset provided to the --packages flag. Unable to resolve preset "${id}" for package "${pkgName}"`,
          );
        }
      }

      // Get transform file paths
      if (config.transforms) {
        if (flags.sequence) {
          Object.entries(config.transforms as Record<string, string>)
            .filter(([key]) => semver.satisfies(key, `>=${transformIds[0]}`))
            .forEach(([, path]) => transforms.push(path));
        } else {
          for (const [id, path] of Object.entries(
            config.transforms as Record<string, string>,
          )) {
            if (transformIds.includes(id)) {
              transforms.push(path);
            }
          }
        }
      }

      // Get preset file paths
      if (config.presets) {
        for (const [id, path] of Object.entries(
          config.presets as Record<string, string>,
        )) {
          if (presetIds.includes(id)) {
            transforms.push(path);
          }
        }
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
