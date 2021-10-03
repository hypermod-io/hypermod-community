import semver from 'semver';
import chalk from 'chalk';
import { PluginManager } from 'live-plugin-manager';
// @ts-ignore Run transform(s) on path https://github.com/facebook/jscodeshift/issues/398
import * as jscodeshift from 'jscodeshift/src/Runner';

import { Flags } from './types';
import { InvalidUserInputError } from './errors';

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

  const packageManager = new PluginManager();

  if (flags.packages) {
    const pkgs = flags.packages.split(',').filter(pkg => !!pkg);

    for (const pkg of pkgs) {
      const pkgName = pkg
        .split(/[@#]/)
        .filter(str => !!str)[0]
        .replace('/', '__');
      const codemodName = `@codeshift/mod-${pkgName}`;

      await packageManager.install(codemodName);
      // TODO: check if default exists first. module.exports might not have it
      const { default: codeshiftConfig } = packageManager.require(codemodName);

      const codemodIds = pkg.split(/(?=[@#])/).filter(str => !!str);
      codemodIds.shift();

      const transformIds = codemodIds
        .filter(id => id.startsWith('@'))
        .map(id => id.substring(1))
        .sort((idA, idB) => {
          if (semver.lt(idA, idB)) return -1;
          if (semver.gt(idA, idB)) return 1;
          return 0;
        });

      const presetIds = codemodIds
        .filter(id => id.startsWith('#'))
        .map(id => id.substring(1));

      // Validate transforms/presets
      transformIds.forEach(id => {
        if (!semver.valid(semver.coerce(id.substring(1)))) {
          throw new InvalidUserInputError(
            `Invalid version provided to the --packages flag. Unable to resolve version "${id}" for package "${pkgName}". Please try: "[scope]/[package]@[version]" for example @mylib/mypackage@10.0.0`,
          );
        }

        if (!codeshiftConfig.transforms || !codeshiftConfig.transforms[id]) {
          throw new InvalidUserInputError(
            `Invalid version provided to the --packages flag. Unable to resolve version "${id}" for package "${pkgName}"`,
          );
        }
      });

      presetIds.forEach(id => {
        if (!codeshiftConfig.presets || !codeshiftConfig.presets[id]) {
          throw new InvalidUserInputError(
            `Invalid preset provided to the --packages flag. Unable to resolve preset "${id}" for package "${pkgName}"`,
          );
        }
      });

      // Get transform file paths
      if (codeshiftConfig.transforms) {
        if (flags.sequence) {
          Object.entries(codeshiftConfig.transforms as Record<string, string>)
            .filter(([key]) => semver.satisfies(key, `>=${transformIds[0]}`))
            .forEach(([, path]) => transforms.push(path));
        } else {
          Object.entries(
            codeshiftConfig.transforms as Record<string, string>,
          ).forEach(([id, path]) => {
            if (transformIds.includes(id)) {
              transforms.push(path);
            }
          });
        }
      }

      // Get preset file paths
      if (codeshiftConfig.presets) {
        Object.entries(
          codeshiftConfig.presets as Record<string, string>,
        ).forEach(([id, path]) => {
          if (presetIds.includes(id)) {
            transforms.push(path);
          }
        });
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
      dry: false,
      print: true,
      babel: true,
      extensions: flags.extensions,
      ignorePattern: flags.ignorePattern,
      ignoreConfig: [],
      runInBand: false,
      silent: false,
      parser: flags.parser,
      stdin: false,
    });
  }

  await packageManager.uninstallAll();
}
