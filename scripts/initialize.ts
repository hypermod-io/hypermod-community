import { initDirectory, initTransform } from '@codeshift/initializer';

const targetPath = `${__dirname}/../community`;

export function main(packageName: string, transform?: string) {
  if (!packageName) throw new Error('Package name was not provided');
  if (!transform) throw new Error('Version was not provided');

  if (transform) {
    initDirectory(packageName, targetPath);
    initTransform(packageName, transform, 'version', targetPath);
  }

  console.log(
    `🚚 New codemod package created at: community/${packageName}/${transform}`,
  );
}

main(process.argv[2], process.argv[3]);
