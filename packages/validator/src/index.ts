import semver from 'semver';

import { Config } from '@hypermod/types';
import { fetchConfig } from '@hypermod/fetcher';

function hasValidTransforms(config: Config) {
  if (!config.transforms) return true;

  return Object.entries(config.transforms).every(([key]) => semver.valid(key));
}

function hasValidPresets(config: Config): boolean {
  if (!config.presets) return true;

  return Object.entries(config.presets).every(([key]) =>
    key.match(/^[0-9a-zA-Z\-]+$/),
  );
}

function getInvalidProperties(config: Config) {
  const validProperties = [
    'maintainers',
    'description',
    'targets',
    'transforms',
    'presets',
  ];

  return Object.keys(config).filter(key => !validProperties.includes(key));
}

export function isValidPackageName(dir: string): boolean {
  return !!dir.match(/^(@[a-z0-9-~][a-z0-9-._~]*__)?[a-z0-9-~][a-z0-9-._~]*$/);
}

export function isValidConfig(config: Config) {
  return hasValidTransforms(config) && hasValidPresets(config);
}

export async function isValidConfigAtPath(filePath: string) {
  const configMeta = await fetchConfig(filePath);

  if (!configMeta) {
    throw new Error(`Unable to locate config file at path: ${filePath}`);
  }

  const invalidProperties = getInvalidProperties(configMeta.config);
  if (invalidProperties.length) {
    throw new Error(
      `Invalid transform ids found: ${invalidProperties.join(', ')}`,
    );
  }

  if (!hasValidTransforms(configMeta.config)) {
    throw new Error(`Invalid transform ids found for config at "${filePath}".
Please make sure all transforms are identified by a valid semver version. ie 10.0.0`);
  }

  if (!hasValidPresets(configMeta.config)) {
    throw new Error(`Invalid preset ids found for config at "${filePath}".
Please make sure all presets are kebab case and contain no spaces or special characters. ie sort-imports-by-scope`);
  }

  return true;
}
