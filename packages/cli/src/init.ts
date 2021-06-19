import { initDirectory } from '@codeshift/initializer';

export default async function init(
  packageName: string,
  version: string,
  targetPath: string = '.',
) {
  initDirectory(packageName, version, targetPath);

  console.log(
    `🚚 New codemod package created at: ${targetPath}/${packageName}`,
  );
}
