import inquirer from 'inquirer';
import semver from 'semver';

import * as core from '@hypermod/core';

import { InvalidUserInputError } from '../errors';
import { getConfigPrompt } from '../prompt';
import { fetchNpmPkg } from '../fetchers/npm';
import { mergeConfigs } from '../utils/merge-configs';
import { ModuleLoader } from '@hypermod/fetcher';

/**
 * Resolves transforms from the npm registry.
 * If no transforms are provided, show a prompt with all available codemods
 * for the provided package.
 */
export async function resolveNpmTransforms(
  flags: Partial<core.Flags>,
  pkg: string,
  packageManager: ModuleLoader,
) {
  const transforms: string[] = [];

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

  const { community, remote } = await fetchNpmPkg(pkgName, packageManager);

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

  return transforms;
}
