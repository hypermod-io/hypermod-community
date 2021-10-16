import { initDirectory } from '@codeshift/initializer';

export default async function init(
  packageName: string,
  transform?: string,
  preset?: string,
  targetPath: string = '.',
) {
  if (transform) {
    initDirectory(packageName, transform, 'version', targetPath);
  }

  if (preset) {
    initDirectory(packageName, preset, 'preset', targetPath);
  }

  console.log(
    `🚚 New codemod package created at: ${targetPath}/${packageName}`,
  );
}
