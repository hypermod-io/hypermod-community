import fs from 'fs-extra';
import semver from 'semver';
import path from 'path';

import { CodeshiftConfig } from '@codeshift/types';
import { fetchConfig } from '@codeshift/fetcher';

function hasValidTransforms(config: CodeshiftConfig) {
  if (!config.transforms) return true;

  return Object.entries(config.transforms).every(([key]) => semver.valid(key));
}

function hasValidPresets(config: CodeshiftConfig): boolean {
  if (!config.presets) return true;

  return Object.entries(config.presets).every(([key]) =>
    key.match(/^[\dA-Za-z\-]+$/),
  );
}

export function isValidPackageName(dir: string): boolean {
  return !!dir.match(/^(@[\da-z~-][\d._a-z~-]*__)?[\da-z~-][\d._a-z~-]*$/);
}

export function isValidConfig(config: CodeshiftConfig) {
  return hasValidTransforms(config) && hasValidPresets(config);
}

export async function isValidConfigAtPath(filePath: string) {
  const config = await fetchConfig(filePath);

  if (!config) {
    throw Error(`Unable to locate config file at path: ${filePath}`);
  }

  if (!hasValidTransforms(config)) {
    throw Error(`Invalid transform ids found for config at "${filePath}".
Please make sure all transforms are identified by a valid semver version. ie 10.0.0`);
  }

  if (!hasValidPresets(config)) {
    throw Error(`Invalid preset ids found for config at "${filePath}".
Please make sure all presets are kebab case and contain no spaces or special characters. ie sort-imports-by-scope`);
  }

  return true;
}

export async function isValidPackageJson(targetPath: string) {
  const packageJsonRaw = await fs.readFile(
    path.join(targetPath, 'package.json'),
    'utf8',
  );
  const packageJson = JSON.parse(packageJsonRaw);

  if (!packageJson.name) {
    throw Error('No package name provided in package.json');
  }

  if (!packageJson.main) {
    throw Error('No main entrypoint provided in package.json');
  }

  return true;
}
