import fs from 'fs-extra';
import semver from 'semver';
import * as recast from 'recast';

const packageNameRegex = /^(@[a-z0-9-~][a-z0-9-._~]*__)?[a-z0-9-~][a-z0-9-._~]*$/;

export function isValidPackageName(dir: string) {
  return dir.match(packageNameRegex);
}

export async function isValidConfig(path: string) {
  const configPath = path + `/codeshift.config.js`;
  const source = await fs.readFile(configPath, 'utf8');
  const ast = recast.parse(source);

  let hasTransforms = false;
  let invalidSemverIds = [];
  let transformCount = 0;

  recast.visit(ast, {
    visitProperty(path) {
      // @ts-ignore
      if (path.node.key.name === 'transforms') {
        hasTransforms = true;
        // @ts-ignore
        const properties = path.node.value.properties;
        transformCount = properties.length;
        // @ts-ignore
        properties.forEach(property => {
          if (!semver.valid(property.key.value)) {
            invalidSemverIds.push(property.key.value);
          }
        });
      }

      return false;
    },
  });

  if (!hasTransforms || !transformCount) {
    throw new Error(
      'At least one transform should be specified for config at "${configPath}"',
    );
  }

  if (invalidSemverIds.length) {
    throw new Error(`Invalid transform ids found for config at "${configPath}".
      Please make sure all transforms are identified by a valid semver version. ie 10.0.0`);
  }
}

export async function isValidPackageJson(path: string) {
  const packageJsonRaw = await fs.readFile(path + '/package.json', 'utf8');
  const packageJson = JSON.parse(packageJsonRaw);

  if (!packageJson.name) {
    throw new Error('No package name provided in package.json');
  }

  if (!packageJson.main) {
    throw new Error('No main entrypoint provided in package.json');
  }
}
