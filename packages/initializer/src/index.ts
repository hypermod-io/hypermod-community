import fs from 'fs-extra';
import semver from 'semver';
import * as recast from 'recast';

export function initDirectory(
  packageName: string,
  version: string,
  targetPath: string = './',
) {
  if (!semver.valid(version)) {
    throw new Error(
      `Provided version ${version} is not a valid semver version`,
    );
  }

  const basePath = `${targetPath}/${packageName.replace('/', '__')}`;
  const codemodPath = `${basePath}/${version}`;
  const configPath = `${basePath}/codeshift.config.js`;
  const packagePath = `${basePath}/package.json`;
  const motionsPath = `${codemodPath}/motions`;

  fs.mkdirSync(codemodPath, { recursive: true });

  fs.copyFileSync(
    `${__dirname}/../template/transform.spec.ts`,
    `${codemodPath}/transform.spec.ts`,
  );
  fs.copyFileSync(
    `${__dirname}/../template/transform.ts`,
    `${codemodPath}/transform.ts`,
  );
  fs.copySync(`${__dirname}/../template/motions`, motionsPath);

  const testFile = fs
    .readFileSync(`${codemodPath}/transform.spec.ts`, 'utf8')
    .replace('<% packageName %>', packageName)
    .replace('<% version %>', version);

  fs.writeFileSync(`${codemodPath}/transform.spec.ts`, testFile);

  fs.writeFileSync(
    packagePath,
    `{
  "name": "${packageName}",
  "version": "0.0.1",
  "license": "MIT",
  "main": "dist/${packageName}.cjs.js",
  "dependencies": {
    "@codeshift/utils": "^0.1.2"
  },
  "devDependencies": {
    "jscodeshift": "^0.12.0"
  }
}`,
  );

  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(
      configPath,
      `export default {
  maintainers: [],
  transforms: {
    '${version}': require('./${version}/transform'),
  }
};
`,
    );
  } else {
    const source = fs.readFileSync(configPath, 'utf8');
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

    fs.writeFileSync(
      configPath,
      recast.prettyPrint(ast, { quote: 'single', trailingComma: true }).code,
    );
  }
}
