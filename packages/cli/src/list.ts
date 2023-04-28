import chalk from 'chalk';
import { PluginManager } from 'live-plugin-manager';

import { fetchPackageConfig } from './fetch-package';

export default async function list(packages: string[]) {
  const packageManager = new PluginManager({});
  const configs = [];

  for (const packageName of packages) {
    try {
      const config = await fetchPackageConfig(packageName, packageManager);
      configs.push({ packageName, config });
    } catch (error) {
      console.warn(
        chalk.red(
          `Unable to find codeshift package: ${chalk.bold(packageName)}.`,
        ),
      );

      continue;
    }
  }

  configs.forEach(({ packageName, config }) => {
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
  });
}
