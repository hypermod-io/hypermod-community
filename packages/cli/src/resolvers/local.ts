import chalk from 'chalk';
import findUp from 'find-up';
import inquirer from 'inquirer';
import semver from 'semver';

import * as core from '@hypermod/core';
import { fetchConfigAtPath } from '@hypermod/fetcher';

import { InvalidUserInputError } from '../errors';
import {
  fetchConfigsForWorkspaces,
  getPackageJson,
} from '../utils/file-system';
import { getConfigPrompt, getMultiConfigPrompt } from '../prompt';

/**
 * Resolves local transforms from the local file system hypermod.config file or package.json file.
 */
export async function resolveLocalTransforms(flags: Partial<core.Flags>) {
  const transforms: string[] = [];
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
      transforms.push(selectedConfig.config.presets[answers.codemod.selection]);
    }
  } else {
    /**
     * Otherwise, locate any config files in parent directories
     */
    const configFilePath = await findUp([
      'hypermod.config.js',
      'hypermod.config.mjs',
      'hypermod.config.cjs',
      'hypermod.config.ts',
      'hypermod.config.tsx',
      'src/hypermod.config.js',
      'src/hypermod.config.mjs',
      'src/hypermod.config.cjs',
      'src/hypermod.config.ts',
      'src/hypermod.config.tsx',
      'codemods/hypermod.config.js',
      'codemods/hypermod.config.mjs',
      'codemods/hypermod.config.cjs',
      'codemods/hypermod.config.ts',
      'codemods/hypermod.config.tsx',
      'codeshift.config.js',
      'codeshift.config.mjs',
      'codeshift.config.cjs',
      'codeshift.config.ts',
      'codeshift.config.tsx',
      'src/codeshift.config.js',
      'src/codeshift.config.mjs',
      'src/codeshift.config.cjs',
      'src/codeshift.config.ts',
      'src/codeshift.config.tsx',
      'codemods/codeshift.config.js',
      'codemods/codeshift.config.mjs',
      'codemods/codeshift.config.cjs',
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

  return transforms;
}
