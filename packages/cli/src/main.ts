import semver from 'semver';
import chalk from 'chalk';
import path from 'path';
import { PluginManager } from 'live-plugin-manager';
// @ts-ignore Run transform(s) on path https://github.com/facebook/jscodeshift/issues/398
import * as jscodeshift from 'jscodeshift/src/Runner';
import { isValidConfig } from '@codeshift/validator';

import { Flags } from './types';
import { InvalidUserInputError } from './errors';

const packageManager = new PluginManager();

async function fetchPackageConfig(packageName: string) {
  // Attempt to find package from the community folder
  await packageManager.install(`@codeshift/mod-${packageName}`);
  const commPkg = packageManager.require(packageName);
  const commConfig = commPkg.default ? commPkg.default : commPkg;

  // if (!isValidConfig(commConfig)) {
  // }

  // Attempt to find source package from npm
  await packageManager.install(packageName);
  // For source packages, fetching configs is a bit more elaborate
  let config;

  // Attemp to fetch from the main entrypoint
  const info = packageManager.getInfo(packageName);
  const pkg = packageManager.require(packageName);

  if (info || pkg) {
    config = pkg.default ? pkg.default : pkg;

    if (config && isValidConfig) {
      // Found a config at the main entry-point
    }

    config = require(path.join(info?.location, 'codeshift.config.js'));
    config = require(path.join(info?.location, 'src', 'codeshift.config.js'));
    config = require(path.join(
      info?.location,
      'codemods',
      'codeshift.config.js',
    ));
  }
  // if ()

  return config;
}

export default async function main(paths: string[], flags: Flags) {
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
    transforms.push(flags.transform);
  }

  if (flags.packages) {
    const pkgs = flags.packages.split(',').filter(pkg => !!pkg);

    for (const pkg of pkgs) {
      const pkgName = pkg
        .split(/[@#]/)
        .filter(str => !!str)[0]
        .replace('/', '__');

      const config = await fetchPackageConfig(pkgName);

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
      verbose: 0,
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
