import chalk from 'chalk';
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

    await packageManager.install(codemodName);
    const { default: codeshiftConfig } = packageManager.require(codemodName);

    console.log(chalk.bold(pkg));

    if (codeshiftConfig.transforms) {
      console.log(`├─ transforms`),
        Object.keys(codeshiftConfig.transforms).forEach(
          (transform, index, array) => {
            if (index + 1 === array.length) {
              console.log(`|  └─ ${transform}`);
              return;
            }
            console.log(`|  ├─ ${transform}`);
          },
        );
    }

    if (codeshiftConfig.presets) {
      console.log(`└─ presets`),
        Object.keys(codeshiftConfig.presets).forEach(
          (transform, index, array) => {
            if (index + 1 === array.length) {
              console.log(`   └─ ${transform}`);
              return;
            }
            console.log(`|  ├─ ${transform}`);
          },
        );
    }
  }
}
