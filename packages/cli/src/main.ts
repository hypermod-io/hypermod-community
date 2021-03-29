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
    //  Parse package string
    //  fetch transform from npm
    //  assign transform(s) to var

    // TODO: consider using https://www.npmjs.com/package/npm-registry-client instead
    const packageManager = new PluginManager();
    await packageManager.install('moment');

    const moment = packageManager.require('moment');
    console.log(moment().format());

    await packageManager.uninstall('moment');
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
