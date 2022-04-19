import path from 'path';
import chalk from 'chalk';
import {
  initConfig,
  initDirectory,
  initTransform,
} from '@codeshift/initializer';

export default async function init(
  transform?: string,
  preset?: string,
  configOnly?: boolean,
  targetPath = '.',
) {
  const packageName =
    targetPath !== '.' ? path.basename(targetPath) : 'codeshift-community';

  if (configOnly) {
    initConfig(packageName, targetPath);
  } else {
    initDirectory(packageName, targetPath);
  }

  if (transform) initTransform(packageName, transform, 'version', targetPath);
  if (preset) initTransform(packageName, preset, 'preset', targetPath);

  console.log(chalk.green(`🚚 New codemod package created at: ${targetPath}`));
}
