import ora from 'ora';
import chalk from 'chalk';
import { PluginManager } from 'live-plugin-manager';

import {
  fetchPackage,
  fetchRemotePackage,
  ConfigMeta,
} from '@hypermod/fetcher';
import { isValidConfig } from '@hypermod/validator';

import { getCodeshiftPackageName } from './package-names';

export async function fetchPackages(
  packageName: string,
  packageManager: PluginManager,
) {
  const codeshiftPackageName = getCodeshiftPackageName(packageName);
  let codeshiftPackage: ConfigMeta | undefined;
  let remotePackage: ConfigMeta | undefined;

  const spinner = ora(
    `${chalk.green(
      'Attempting to download CodeshiftCommunity package:',
    )} ${packageName}`,
  ).start();

  try {
    codeshiftPackage = await fetchPackage(codeshiftPackageName, packageManager);
    spinner.succeed(
      `${chalk.green(
        'Found CodeshiftCommunity package:',
      )} ${codeshiftPackageName}`,
    );
  } catch (error) {
    spinner.warn(
      `${chalk.yellow(
        `Unable to locate CodeshiftCommunity package:`,
      )} ${codeshiftPackageName}`,
    );
  }

  if (codeshiftPackage && !isValidConfig(codeshiftPackage.config)) {
    throw new Error(
      `Unable to locate a valid codeshift.config for Community package: ${packageName}`,
    );
  }

  try {
    spinner.info(
      `${chalk.green(`Attempting to download npm package:`)} ${packageName}`,
    );
    remotePackage = await fetchRemotePackage(packageName, packageManager);
    spinner.succeed(
      `${chalk.green('Found codeshift package:')} ${packageName}`,
    );
  } catch (error) {
    spinner.warn(
      `${chalk.yellow('Unable to locate codeshift package:')} ${packageName}`,
    );
  }

  if (remotePackage && !isValidConfig(remotePackage.config)) {
    throw new Error(
      `Unable to locate a valid codeshift.config for remote package: ${packageName}`,
    );
  }

  if (!codeshiftPackage && !remotePackage) {
    throw new Error(
      `Unable to locate package from codeshift-community or NPM.
Make sure the package name "${packageName}" is correct and try again.`,
    );
  }

  return {
    community: codeshiftPackage,
    remote: remotePackage,
  };
}
