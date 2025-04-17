import chalk from 'chalk';
import { PluginManager } from 'live-plugin-manager';

import { fetchNpmPkg } from './fetchers/npm';
import { getHypermodPackageName } from './utils/package-names';

export default async function list(packages: string[]) {
  const packageManager = new PluginManager() as any;
  const configs = [];

  for (const packageName of packages) {
    try {
      const { community, remote } = await fetchNpmPkg(
        packageName,
        packageManager,
      );
      community &&
        configs.push({
          packageName: getHypermodPackageName(packageName),
          config: community.config,
        });
      remote && configs.push({ packageName, config: remote.config });
    } catch (error) {
      console.warn(
        chalk.red(
          `Unable to find Hypermod package: ${chalk.bold(packageName)}.`,
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
