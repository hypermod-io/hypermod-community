// import { ParsedPath } from 'path';
// import semver from 'semver';

import { PluginManager } from 'live-plugin-manager';
// @ts-ignore
import * as jscodeshift from 'jscodeshift/src/Runner';

import { Flags } from './cli';
import { InvalidUserInputError } from './errors';

export default async function main(
  paths: string[],
  flags: Flags = { parser: 'babel' },
) {
  console.log('CodeshiftCommunity CLI');
  console.log(paths, flags);

  const transforms = [];

  if (!flags.transform && !flags.packages) {
    throw new InvalidUserInputError(
      'No transform provided, please specify a transform with either the --transform or --packages flags',
    );
  }

  if (flags.transform) {
    transforms.push(flags.transform);
  }

  if (flags.packages) {
    const rawPackageName = flags.packages.replace('@', '').replace('/', '__');
    const packageName = `@codeshift/mod-${rawPackageName}`;
    console.log(rawPackageName, packageName);

    const packageManager = new PluginManager();
    await packageManager.install(packageName);

    const codemod = packageManager.require(packageName);

    console.log(
      // codemod,
      codemod.transform18_0_0,
      codemod.transform19_0_0,
      // packageManager.list(),
      // packageManager.getInfo(packageName),
    );

    // TODO: We'll have to uninstall the mod at some point
    // await packageManager.uninstall('codemod');
  }

  if (!transforms.length) {
    throw new Error('Unable to locate transforms from provided flags');
  }

  for (const transform of transforms) {
    // run transform(s) on path https://github.com/facebook/jscodeshift/issues/398
    jscodeshift.run('', paths, {
      transform: transform,
      verbose: 0,
      dry: false,
      print: true,
      babel: true,
      extensions: 'js,jsx,ts,tsx',
      ignorePattern: [],
      ignoreConfig: [],
      runInBand: false,
      silent: false,
      parser: flags.parser,
      stdin: false,
    });
  }
}
