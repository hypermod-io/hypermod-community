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

  if (!configOnly) {
    console.log(
      chalk.green(`🚚 New codemod package created at: ${targetPath}`),
    );

    console.log(`
  Inside that directory, you can run the following commands:

  ${chalk.blueBright('npm run dev')}
  Starts the Codeshift cli

  ${chalk.blueBright('npm run test')}
  Launches the test runner in watch mode.

  ${chalk.blueBright('npm run validate')}
  Checks the validity of your \`codeshift.config.js\` file

  ${chalk.blueBright('npm run build')}
  Builds the app for production to the \`dist\` folder.

  Get started by running:

  ${chalk.blueBright(`cd ${packageName}`)}
  ${chalk.blueBright(`npm install`)}
  ${chalk.blueBright(`npm start test`)}
`);

    return;
  }

  console.log(
    chalk.green(`🚚 New codeshift.config.js created at: ${targetPath}`),
  );
}
