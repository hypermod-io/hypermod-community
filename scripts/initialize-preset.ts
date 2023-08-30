import chalk from 'chalk';
import path from 'path';

import { initDirectory, initTransform } from '@hypermod/initializer';

const communityPath = `${__dirname}/../community`;

export function main(packageName: string, preset?: string) {
  if (!packageName)
    throw new Error(
      chalk.red(
        'Package name was not provided. Example: yarn community:init foobar my-preset',
      ),
    );
  if (!preset)
    throw new Error(
      chalk.red(
        'Preset name was not provided. Example: Example: yarn community:init foobar my-preset',
      ),
    );

  const targetPath = path.join(communityPath, packageName.replace('/', '__'));

  if (preset) {
    initDirectory(packageName, targetPath, true);
    initTransform(packageName, preset, 'preset', targetPath);
  }

  console.log(
    chalk.green(
      `🚚 New codemod package created at: ./community/${packageName}/${preset}`,
    ),
  );
}

main(process.argv[2], process.argv[3]);
