import ora from 'ora';
import chalk from 'chalk';
import merge from 'lodash/merge';
import { PluginManager } from 'live-plugin-manager';

import { fetchPackage, fetchRemotePackage } from '@codeshift/fetcher';
import { isValidConfig } from '@codeshift/validator';
import { CodeshiftConfig } from '@codeshift/types';

function getCodeshiftPackageName(packageName: string) {
  return `@codeshift/mod-${packageName.replace('@', '').replace('/', '__')}`;
}

export async function fetchPackageConfig(
  packageName: string,
  packageManager: PluginManager,
) {
  let codeshiftConfig: CodeshiftConfig | undefined;
  let remoteConfig: CodeshiftConfig | undefined;

  const spinner = ora(
    `${chalk.green('Attempting to download package:')} ${packageName}`,
  ).start();

  try {
    codeshiftConfig = await fetchPackage(
      getCodeshiftPackageName(packageName),
      packageManager,
    );
    spinner.succeed(
      `${chalk.green(
        'Found CodeshiftCommunity package:',
      )} ${getCodeshiftPackageName(packageName)}`,
    );
  } catch (error) {
    spinner.warn(
      `${chalk.yellow(
        `Unable to locate CodeshiftCommunity package:`,
      )} ${getCodeshiftPackageName(packageName)}`,
    );
    console.log(error);
  }

  try {
    remoteConfig = await fetchRemotePackage(packageName, packageManager);
    spinner.succeed(
      `${chalk.green('Found codeshift package:')} ${packageName}`,
    );
  } catch (error) {
    spinner.warn(
      `${chalk.yellow('Unable to locate codeshift package:')} ${packageName}`,
    );
    console.log(error);
  }

  if (!codeshiftConfig && !remoteConfig) {
    throw new Error(
      `Unable to locate package from codeshift-community or NPM.
Make sure the package name "${packageName}" is correct and try again.`,
    );
  }

  const config: CodeshiftConfig = merge({}, remoteConfig, codeshiftConfig);

  if (!isValidConfig(config)) {
    throw new Error(
      `Unable to locate a valid codeshift.config in package: ${packageName}`,
    );
  }

  return config;
}
