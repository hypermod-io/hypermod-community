import chalk from 'chalk';
import { PluginManager } from 'live-plugin-manager';
import { CodeshiftConfig } from '@codeshift/types';

export default async function list(packages: string[]) {
  const packageManager = new PluginManager();

  for (const packageName of packages) {
    const pkgSplit = packageName.split('@').filter(str => !!str);
    const name = pkgSplit[0].replace('/', '__');
    const codemodName = `@codeshift/mod-${name}`;

    try {
      await packageManager.install(codemodName);
    } catch {
      console.warn(
        chalk.red(
          `Unable to find codeshift package: ${chalk.bold(packageName)}.`,
        ),
      );

      continue;
    }

    await packageManager.install(codemodName);
    const pkg = packageManager.require(codemodName);
    const config: CodeshiftConfig = pkg.default || pkg;

    console.log(chalk.bold(packageName));

    if (config.transforms) {
      console.log(`├─ transforms`);

      Object.keys(config.transforms).forEach((transform, index, array) => {
        if (index + 1 === array.length) {
          console.log(`|  └─ ${transform}`);
          return;
        }
        console.log(`|  ├─ ${transform}`);
      });
    }

    if (config.presets) {
      console.log(`└─ presets`);

      Object.keys(config.presets).forEach((transform, index, array) => {
        if (index + 1 === array.length) {
          console.log(`   └─ ${transform}`);
          return;
        }
        console.log(`|  ├─ ${transform}`);
      });
    }
  }
}
