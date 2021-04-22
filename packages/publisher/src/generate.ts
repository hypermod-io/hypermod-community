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
        jscodeshift: '^0.11.0',
        '@codeshift/utils': '*',
      },
    },
    null,
    2,
  );
}

function getIndexFile(path: string) {
  return fs
    .readdirSync(path)
    .filter(subDirPath => fs.lstatSync(`${path}/${subDirPath}`).isDirectory())
    .map(
      transformDir =>
        `export { default as transform${transformDir.replace(
          /\./gi,
          '_',
        )} } from \'./${transformDir}/transform\';\n`,
    )
    .join('')
    .trim();
}

export default async function generatePackages(
  sourcePath: string,
  targetPath: string,
  changedPackages: string[],
) {
  fs.mkdirSync(targetPath);
  fs.readdirSync(sourcePath)
    .filter(dir => changedPackages.includes(dir))
    .forEach(async dir => {
      const packageName = `@codeshift/mod-${dir
        .replace('@', '')
        .replace('/', '__')}`;
      const packageVersion = await getPackageVersion(packageName);
      // We need to manually patch bump the codemod
      const nextPackageVersion = semver.inc(packageVersion, 'patch');

      const basePath = `${targetPath}/${dir}`;
      fs.copySync(`${sourcePath}/${dir}`, `${basePath}/src`);
      fs.copyFileSync(
        `${__dirname}/../template/LICENSE`,
        `${basePath}/LICENSE`,
      );
      fs.copyFileSync(
        `${__dirname}/../template/.npmignore`,
        `${basePath}/.npmignore`,
      );
      fs.writeFileSync(
        `${basePath}/src/index.ts`,
        getIndexFile(`${basePath}/src`),
      );
      fs.writeFileSync(
        `${basePath}/package.json`,
        getPackageJson(packageName, nextPackageVersion!),
      );
    });
}

export function cleanTargetDir(path: string) {
  if (fs.existsSync(path)) fs.rmSync(path, { recursive: true });
}
