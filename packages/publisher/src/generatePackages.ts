import fs, { lstatSync } from 'fs-extra';

function getPackageJson(moduleName: string) {
  return JSON.stringify(
    {
      name: moduleName,
      version: '0.1.0', // TODO
      main: 'dist/codeshift-cli.cjs.js',
      license: 'MIT',
      repository: 'https://github.com/CodeshiftCommunity/CodeshiftCommunity/',
      scripts: {},
      dependencies: {
        jscodeshift: '^0.11.0',
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
) {
  fs.mkdirSync(targetPath);
  fs.readdirSync(sourcePath).forEach(dir => {
    const moduleName = `@codeshift/mod-${dir
      .replace('@', '')
      .replace('/', '__')}`;

    const basePath = `${targetPath}/${dir}`;
    fs.copySync(`${sourcePath}/${dir}`, basePath);
    fs.copyFileSync(`./template/LICENSE`, `${basePath}/LICENSE`);
    fs.copyFileSync(`./template/README.md`, `${basePath}/README.md`);
    fs.copyFileSync(`./template/.npmignore`, `${basePath}/.npmignore`);
    fs.writeFileSync(`${basePath}/index.ts`, getIndexFile(basePath));
    fs.writeFileSync(`${basePath}/package.json`, getPackageJson(moduleName));
  });
}

export function cleanTargetDir(path: string) {
  if (fs.existsSync(path)) fs.rmSync(path, { recursive: true });
}
