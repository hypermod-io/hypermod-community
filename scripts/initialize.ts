import chalk from 'chalk';
import path from 'path';

import { initDirectory, initTransform } from '@codeshift/initializer';

const communityPath = `${__dirname}/../community`;

export function main(packageName: string, transform?: string) {
  if (!packageName)
    throw new Error(
      chalk.red(
        'Package name was not provided. Example: yarn community:init foobar 12.0.0',
      ),
    );
  if (!transform)
    throw new Error(
      chalk.red(
        'Version was not provided. Example: Example: yarn community:init foobar 12.0.0',
      ),
    );

  const targetPath = path.join(communityPath, packageName.replace('/', '__'));

  if (transform) {
    initDirectory(packageName, targetPath, true);
    initTransform(packageName, transform, 'version', targetPath, true);
  }

  console.log(
    chalk.green(
      `🚚 New codemod package created at: ./community/${packageName}/${transform}`,
    ),
  );
}

main(process.argv[2], process.argv[3]);
