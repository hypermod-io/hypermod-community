import semver from 'semver';
import fs from 'fs-extra';
// @ts-ignore
import RegClient from 'npm-registry-client';
import { getPackageJson } from '@codeshift/initializer';

const client = new RegClient();
const npmUri = 'https://registry.npmjs.org/';

function getPackageVersion(packageName: string) {
  return new Promise<string>((resolve, reject) =>
    client.get(
      npmUri + packageName,
      { timeout: 2000 },
      (
        error: any,
        data: { 'dist-tags': { latest: string } },
        _raw: any,
        res: { statusCode: number },
      ) => {
        if (res.statusCode === 404) return resolve('0.0.0');
        if (error) reject(`Unexpected error when contacting NPM: ${error}`);

        resolve(data['dist-tags'].latest);
      },
    ),
  );
}

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
        const packageVersion = await getPackageVersion(packageName);
        // We need to manually patch bump the codemod
        const nextPackageVersion = semver.inc(packageVersion, 'patch');

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
