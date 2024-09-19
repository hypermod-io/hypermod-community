import ora from 'ora';
import chalk from 'chalk';
import { PluginManager } from 'live-plugin-manager';

import {
  fetchPackage,
  fetchRemotePackage,
  ConfigMeta,
} from '@hypermod/fetcher';
import { isValidConfig } from '@hypermod/validator';

import { getHypermodPackageName } from './package-names';

export async function fetchPackages(
  packageName: string,
  packageManager: PluginManager,
) {
  const hypermodPackageName = getHypermodPackageName(packageName);
  let hypermodPackage: ConfigMeta | undefined;
  let remotePackage: ConfigMeta | undefined;

  const spinner = ora(
    `${chalk.green('Attempting to download Hypermod package:')} ${packageName}`,
  ).start();

  try {
    hypermodPackage = await fetchPackage(hypermodPackageName, packageManager);
    spinner.succeed(
      `${chalk.green('Found Hypermod package:')} ${hypermodPackageName}`,
    );
  } catch (error) {
    spinner.warn(
      `${chalk.yellow(
        `Unable to locate Hypermod package:`,
      )} ${hypermodPackageName}`,
    );
  }

  if (hypermodPackage && !isValidConfig(hypermodPackage.config)) {
    throw new Error(
      `Unable to locate a valid hypermod.config for community package: ${packageName}`,
    );
  }

  try {
    spinner.info(
      `${chalk.green(`Attempting to download npm package:`)} ${packageName}`,
    );
    remotePackage = await fetchRemotePackage(packageName, packageManager);
    spinner.succeed(
      `${chalk.green('Found remote Hypermod package:')} ${packageName}`,
    );
  } catch (error) {
    spinner.warn(
      `${chalk.yellow(
        'Unable to locate remote Hypermod package:',
      )} ${packageName}`,
    );
  }

  if (remotePackage && !isValidConfig(remotePackage.config)) {
    throw new Error(
      `Unable to locate a valid hypermod.config for remote package: ${packageName}`,
    );
  }

  if (!hypermodPackage && !remotePackage) {
    throw new Error(
      `Unable to locate package from Hypermod Community or NPM.
Make sure the package name "${packageName}" is correct and try again.`,
    );
  }

  return {
    community: hypermodPackage,
    remote: remotePackage,
  };
}
