import fs from 'fs-extra';
import chalk from 'chalk';
import semver from 'semver';
import { PluginManager } from 'live-plugin-manager';
import { NoTransformsExistError } from './errors';

export default async function list(packages: string[]) {
  const packageManager = new PluginManager();

  for (const pkg of packages) {
    const pkgSplit = pkg.split('@').filter(str => !!str);
    const name = pkgSplit[0].replace('/', '__');
    const codemodName = `@codeshift/mod-${name}`;

    try {
      await packageManager.install(codemodName);
    } catch (error) {
      throw new NoTransformsExistError(
        `No transforms found for package ${pkgSplit[0]}`,
      );
    }

    const info = await packageManager.getInfo(codemodName);

    /**
     * TODO: currently jscodeshift only accepts a path to a transform rather than a function or module.
     * The below logic will need to be refactored once this is fixed
     */
    const modulePath = `${info?.location}/src`;
    const directories = await fs.readdir(modulePath);

    console.log(chalk.bold(pkg));
    directories
      .filter(dir => semver.valid(dir))
      .forEach(dir => console.log(`├─${dir}`));
  }
}
