import fs from 'fs-extra';
import semver from 'semver';
import path from 'path';

export function isValidPackageName(dir: string) {
  return dir.match(/^(@[a-z0-9-~][a-z0-9-._~]*__)?[a-z0-9-~][a-z0-9-._~]*$/);
}

export async function isValidConfig(filePath: string) {
  const configPath = path.join(process.cwd(), filePath, 'codeshift.config.js');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  let config = require(configPath);

  config = !!config.default ? config.default : config;

  const invalidSemverIds = [];
  const invalidPresetIds = [];

  let hasTransforms = false;

  if (config.transforms && Object.keys(config.transforms).length) {
    Object.entries(config.transforms).forEach(([key]) => {
      hasTransforms = true;
      if (!semver.valid(key)) invalidSemverIds.push(key);
    });
  }

  if (config.presets && Object.keys(config.presets).length) {
    hasTransforms = true;
    Object.entries(config.presets).forEach(([key]) => {
      if (key.includes(' ')) invalidPresetIds.push(key);
    });
  }

  if (!hasTransforms) {
    throw new Error(
      `At least one transform should be specified for config at "${configPath}"`,
    );
  }

  if (invalidSemverIds.length) {
    throw new Error(`Invalid transform ids found for config at "${configPath}".
Please make sure all transforms are identified by a valid semver version. ie 10.0.0`);
  }

  if (invalidPresetIds.length) {
    throw new Error(`Invalid preset ids found for config at "${configPath}".
Please make sure all presets are kebab case and contain no spaces or special characters. ie sort-imports-by-scope`);
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
