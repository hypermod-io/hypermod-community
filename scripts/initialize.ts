import { initDirectory } from '@codeshift/initializer';

export function main(packageName: string, version: string) {
  const path = `${__dirname}/../community`;

  if (!packageName) throw new Error('Package name was not provided');
  if (!version) throw new Error('Version was not provided');

  initDirectory(packageName, version, path, true);

  console.log(
    `🚚 New codemod package created at: community/${packageName}/${version}`,
  );
}

main(process.argv[2], process.argv[3]);
