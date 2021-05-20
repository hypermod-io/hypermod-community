import semver from 'semver';
import fs from 'fs-extra';
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
      const pkgSplit = pkg.split('@').filter(str => !!str);
      const name = pkgSplit[0].replace('/', '__');
      const baseVersion = semver.valid(
        semver.coerce(pkgSplit[pkgSplit.length - 1]),
      );

      if (!baseVersion) {
        throw new InvalidUserInputError(
          `Invalid version provided to the --packages flag. Package ${pkg} is missing version. Please try: "@[scope]/[package]@[version]" for example @mylib/avatar@10.0.0`,
        );
      }

      const codemodName = `@codeshift/mod-${name}`;

      await packageManager.install(codemodName);
      const info = await packageManager.getInfo(codemodName);

      /**
       * TODO: currently jscodeshift only accepts a path to a transform rather than a function or module.
       * The below logic will need to be refactored once this is fixed
       */
      const modulePath = `${info?.location}/src`;
      const directories = await fs.readdir(modulePath);

      directories
        .filter(
          dir => semver.valid(dir) && semver.satisfies(dir, `>=${baseVersion}`),
        )
        .filter(dir => {
          if (flags.sequence) return true;

          return baseVersion && semver.eq(dir, baseVersion);
        })
        .forEach(dir => transforms.push(`${modulePath}/${dir}/transform.ts`));
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

  /**
   * TODO: uncomment the below when jscodeshift can be used as an async function
   */
  // await packageManager.uninstallAll();
}
