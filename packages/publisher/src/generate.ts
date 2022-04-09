import fs from 'fs-extra';
import { getPackageJson } from '@codeshift/initializer';

export default async function generatePackages(
  sourcePath: string,
  targetPath: string,
  changedPackages: string[],
) {
  await fs.mkdir(targetPath);

  const directories = await fs.readdir(sourcePath);

  await Promise.all(
    directories
      .filter(dir => changedPackages.includes(dir))
      .map(async dir => {
        const packageName = `@codeshift/mod-${dir
          .replace('@', '')
          .replace('/', '__')}`;

        const basePath = `${targetPath}/${dir}`;
        await fs.copy(`${sourcePath}/${dir}`, `${basePath}/src`);
        await fs.copyFile(
          `${__dirname}/../template/LICENSE`,
          `${basePath}/LICENSE`,
        );
        await fs.copyFile(
          `${__dirname}/../template/.npmignore`,
          `${basePath}/.npmignore`,
        );
        await fs.copyFile(
          `${__dirname}/../template/tsconfig.json`,
          `${basePath}/tsconfig.json`,
        );
        await fs.writeFile(
          `${basePath}/package.json`,
          getPackageJson(packageName, nextPackageVersion!),
        );
      }),
  );
}

export function cleanTargetDir(path: string) {
  if (fs.existsSync(path)) fs.rmSync(path, { recursive: true });
}
