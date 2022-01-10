import path from 'path';
import { initDirectory, initTransform } from '@codeshift/initializer';

export default async function init(
  packageName: string,
  transform?: string,
  preset?: string,
  targetPath: string = '.',
) {
  initDirectory(packageName, targetPath);

  if (transform) initTransform(packageName, transform, 'version', targetPath);
  if (preset) initTransform(packageName, preset, 'preset', targetPath);

  console.log(
    `🚚 New codemod package created at: ${path.join(targetPath, packageName)}`,
  );
}
