import semver from 'semver';

import { CodeshiftConfig } from '@hypermod/types';
import { fetchConfig } from '@hypermod/fetcher';

function hasValidTransforms(config: CodeshiftConfig) {
  if (!config.transforms) return true;

  return Object.entries(config.transforms).every(([key]) => semver.valid(key));
}

function hasValidPresets(config: CodeshiftConfig): boolean {
  if (!config.presets) return true;

  return Object.entries(config.presets).every(([key]) =>
    key.match(/^[0-9a-zA-Z\-]+$/),
  );
}

function getInvalidProperties(config: CodeshiftConfig) {
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

export function isValidConfig(config: CodeshiftConfig) {
  return hasValidTransforms(config) && hasValidPresets(config);
}

export async function isValidConfigAtPath(filePath: string) {
  const { config } = await fetchConfig(filePath);

  if (!config) {
    throw new Error(`Unable to locate config file at path: ${filePath}`);
  }

  const invalidProperites = getInvalidProperties(config);
  if (invalidProperites.length) {
    throw new Error(
      `Invalid transform ids found: ${invalidProperites.join(', ')}`,
    );
  }

  if (!hasValidTransforms(config)) {
    throw new Error(`Invalid transform ids found for config at "${filePath}".
Please make sure all transforms are identified by a valid semver version. ie 10.0.0`);
  }

  if (!hasValidPresets(config)) {
    throw new Error(`Invalid preset ids found for config at "${filePath}".
Please make sure all presets are kebab case and contain no spaces or special characters. ie sort-imports-by-scope`);
  }

  return true;
}
