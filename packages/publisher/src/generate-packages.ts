import fs, { lstatSync } from 'fs-extra';

function getPackageJson(moduleName: string) {
  return JSON.stringify(
    {
      name: moduleName,
      version: '0.1.0', // TODO
      main: `dist/codeshift-${moduleName.replace('@codeshift/', '')}.cjs.js`,
      license: 'MIT',
      repository: 'https://github.com/CodeshiftCommunity/CodeshiftCommunity/',
      scripts: {},
      dependencies: {
        jscodeshift: '^0.11.0',
        '@codeshift/utils': 'latest',
      },
    },
    null,
    2,
  );
}

function getIndexFile(path: string) {
  return fs
    .readdirSync(path)
    .filter(subDirPath => lstatSync(`${path}/${subDirPath}`).isDirectory())
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
    .forEach(dir => {
      const moduleName = `@codeshift/mod-${dir
        .replace('@', '')
        .replace('/', '__')}`;

      const basePath = `${targetPath}/${dir}`;
      fs.copySync(`${sourcePath}/${dir}`, `${basePath}/src`);
      fs.copyFileSync(`./template/LICENSE`, `${basePath}/LICENSE`);
      fs.copyFileSync(`./template/README.md`, `${basePath}/README.md`);
      fs.copyFileSync(`./template/.npmignore`, `${basePath}/.npmignore`);
      fs.writeFileSync(
        `${basePath}/src/index.ts`,
        getIndexFile(`${basePath}/src`),
      );
      fs.writeFileSync(`${basePath}/package.json`, getPackageJson(moduleName));
    });
}

export function cleanTargetDir(path: string) {
  if (fs.existsSync(path)) fs.rmSync(path, { recursive: true });
}
