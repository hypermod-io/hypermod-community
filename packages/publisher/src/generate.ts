import semver from 'semver';
import fs from 'fs-extra';
// @ts-ignore
import RegClient from 'npm-registry-client';

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

function getPackageJson(packageName: string, version: string) {
  return JSON.stringify(
    {
      name: packageName,
      version,
      main: `dist/codeshift-${packageName.replace('@codeshift/', '')}.cjs.js`,
      license: 'MIT',
      repository: 'https://github.com/CodeshiftCommunity/CodeshiftCommunity/',
      scripts: {},
      dependencies: {
        jscodeshift: '^0.12.0',
        '@codeshift/utils': '*',
      },
    },
    null,
    2,
  );
}

export default async function generatePackages(
  sourcePath: string,
  targetPath: string,
  changedPackages: string[],
) {
  await fs.mkdir(targetPath);
  const directories = await fs.readdir(sourcePath);

  directories
    .filter(dir => changedPackages.includes(dir))
    .forEach(async dir => {
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
      await fs.rename(
        `${basePath}/src/codeshift.config.js`,
        `${basePath}/src/index.js`,
      );
      await fs.writeFile(
        `${basePath}/package.json`,
        getPackageJson(packageName, nextPackageVersion!),
      );
    });
}

export function cleanTargetDir(path: string) {
  if (fs.existsSync(path)) fs.rmSync(path, { recursive: true });
}
