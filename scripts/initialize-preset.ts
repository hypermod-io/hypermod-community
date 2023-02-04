import chalk from 'chalk';
import { initDirectory, initTransform } from '@codeshift/initializer';
import path from 'path';

const communityPath = `${__dirname}/../community`;

export function main(packageName: string, preset?: string) {
  if (!packageName) throw new Error('Package name was not provided');
  if (!preset) throw new Error('Preset name was not provided');

  const targetPath = path.join(communityPath, packageName.replace('/', '__'));

  if (preset) {
    initDirectory(packageName, targetPath, true);
    initTransform(packageName, preset, 'preset', targetPath, true);
  }

  console.log(
    chalk.green(
      `🚚 New codemod package created at: ./community/${packageName}/${preset}`,
    ),
  );
}

main(process.argv[2], process.argv[3]);
