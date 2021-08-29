import fs from 'fs-extra';
import semver from 'semver';
import * as recast from 'recast';
import { version as utilVersion } from '@codeshift/utils/package.json';

export function getPackageJson(packageName: string, version: string = '0.0.0') {
  return JSON.stringify(
    {
      name: packageName,
      version: version,
      license: 'MIT',
      main: 'dist/codeshift.config.js',
      scripts: {
        build: 'tsc --build',
        test: 'jest',
      },
      dependencies: {
        '@codeshift/utils': `^${utilVersion}`,
      },
      devDependencies: {
        '@codeshift/test-utils': '*',
        '@types/jest': '^26.0.15',
        jest: '^26.6.0',
        jscodeshift: '^0.12.0',
        prettier: '^1.16.4',
        'ts-jest': '^26.4.4',
        typescript: '^4.3.5',
      },
    },
    null,
    2,
  );
}

function getConfig(packageName: string, version: string) {
  return `export default {
  maintainers: [],
  target: [],
  description: 'Codemods for ${packageName}',
  transforms: {
    '${version}': require('./${version}/transform'),
  },
  presets: {},
};
`;
}

function updateConfig(path: string, packageName: string, version: string) {
  const source = fs.readFileSync(path, 'utf8');
  const ast = recast.parse(source);
  const b = recast.types.builders;

  recast.visit(ast, {
    visitProperty(path) {
      // @ts-ignore
      if (path.node.key.name !== 'transforms') return false;
      // @ts-ignore
      const properties = path.node.value.properties;
      // @ts-ignore
      properties.forEach(property => {
        if (semver.eq(property.key.value, version)) {
          throw new Error(
            `Transform for ${packageName} version ${version} already exists`,
          );
        }
      });

      properties.push(
        b.property(
          'init',
          b.stringLiteral(version),
          b.callExpression(b.identifier('require'), [
            b.stringLiteral(`./${version}/transform`),
          ]),
        ),
      );

      return false;
    },
  });

  return recast.prettyPrint(ast, { quote: 'single', trailingComma: true }).code;
}

export function initDirectory(
  packageName: string,
  version: string,
  targetPath: string = './',
  isReduced: boolean = false,
) {
  if (!semver.valid(version)) {
    throw new Error(
      `Provided version ${version} is not a valid semver version`,
    );
  }

  const basePath = `${targetPath}/${packageName.replace('/', '__')}`;
  const codemodPath = `${basePath}${!isReduced ? '/src/' : ''}/${version}`;
  const configPath = `${basePath}${
    !isReduced ? '/src' : ''
  }/codeshift.config.ts`;

  if (fs.existsSync(codemodPath)) {
    throw new Error(`Codemod for version "${version}" already exists`);
  }

  fs.copySync(`${__dirname}/../template${isReduced ? '/src' : ''}`, basePath);
  fs.renameSync(`${basePath}${!isReduced ? '/src/' : ''}/codemod`, codemodPath);

  const testFile = fs
    .readFileSync(`${codemodPath}/transform.spec.ts`, 'utf8')
    .replace('<% packageName %>', packageName)
    .replace('<% version %>', version);

  fs.writeFileSync(`${codemodPath}/transform.spec.ts`, testFile);

  if (!isReduced) {
    fs.writeFileSync(`${basePath}/package.json`, getPackageJson(packageName));
  }

  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, getConfig(packageName, version));
  } else {
    fs.writeFileSync(
      configPath,
      updateConfig(configPath, packageName, version),
    );
  }
}
