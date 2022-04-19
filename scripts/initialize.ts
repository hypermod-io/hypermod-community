import chalk from 'chalk';
import { initDirectory, initTransform } from '@codeshift/initializer';
import path from 'path';

const communityPath = `${__dirname}/../community`;

export function main(packageName: string, transform?: string) {
  if (!packageName) throw new Error('Package name was not provided');
  if (!transform) throw new Error('Version was not provided');

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
