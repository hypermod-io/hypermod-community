import path from 'path';
import chalk from 'chalk';
import { PluginManager, PluginManagerOptions } from 'live-plugin-manager';

import * as core from '@hypermod/core';
import { type ModuleLoader as MdlLoader } from '@hypermod/fetcher';

import { InvalidUserInputError } from './errors';
import ModuleLoader from './utils/module-loader';
import { resolveLocalTransforms } from './resolvers/local';
import { resolveNpmTransforms } from './resolvers/npm';
import { resolveAppTransforms } from './resolvers/app';

const CLI_DIR = path.join(__dirname, '..', 'node_modules');

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
    pluginsPath: CLI_DIR,
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

  const packageManager: MdlLoader = flags.experimentalLoader
    ? ModuleLoader({
        authToken: flags.registryToken,
        npmRegistryUrl: flags.registry,
        verbose: Boolean(flags.verbose),
      })
    : (new PluginManager(pluginManagerConfig) as unknown as MdlLoader);

  let transforms: string[] = [];

  /**
   * If no transforms are provided, attempt to find codemods in the local hypermod.config file
   * or in the local package.json file.
   */
  if (!flags.transform && !flags.packages) {
    console.log(
      chalk.green(
        'No transforms specified, attempting to find local hypermod.config file(s)',
      ),
    );

    const localTransforms = await resolveLocalTransforms(flags);
    transforms.push(...localTransforms);
  }

  // If a direct path to a transform is provided, use it
  if (flags.transform) {
    if (flags.transform.includes(',')) {
      flags.transform.split(',').forEach(t => transforms.push(t.trim()));
    } else {
      transforms.push(flags.transform);
    }
  }

  // If a package name is provided, fetch the community and remote configs
  // and merge them to get the transforms
  if (flags.packages) {
    const pkgs = flags.packages!.split(',').filter(pkg => !!pkg);

    for (const pkg of pkgs) {
      /**
       * If the package name starts with "hm-", it is a Hypermod transform.
       * We need to fetch the transform from the Hypermod API and add it to the transforms array.
       */
      if (pkg.startsWith('hm-')) {
        const hmTransform = await resolveAppTransforms(pkg, CLI_DIR);
        transforms.push(hmTransform);
        continue;
      }

      /**
       * We need to fetch the transform from the npm registry and add it to the transforms array.
       */
      const npmTransforms = await resolveNpmTransforms(
        flags,
        pkg,
        packageManager,
      );

      transforms.push(...npmTransforms);
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
