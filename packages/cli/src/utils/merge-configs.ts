import { ConfigMeta } from '@hypermod/fetcher';

interface TransformedConfig {
  transforms: Record<string, string>;
  presets: Record<string, string>;
}

export function mergeConfigs(
  config1: ConfigMeta | undefined,
  config2: ConfigMeta | undefined,
) {
  const config: TransformedConfig = { transforms: {}, presets: {} };

  if (config1) {
    config.transforms = Object.keys(config1.config.transforms || []).reduce<
      Record<string, string>
    >((accum, key) => {
      accum[key] = `${config1.filePath}@${key}`;
      return accum;
    }, {});
    config.presets = Object.keys(config1.config.presets || []).reduce<
      Record<string, string>
    >((accum, key) => {
      accum[key] = `${config1.filePath}#${key}`;
      return accum;
    }, {});
  }

  if (config2) {
    config.transforms = Object.keys(config2.config.transforms || []).reduce<
      Record<string, string>
    >((accum, key) => {
      accum[key] = `${config2.filePath}@${key}`;
      return accum;
    }, {});
    config.presets = Object.keys(config2.config.presets || []).reduce<
      Record<string, string>
    >((accum, key) => {
      accum[key] = `${config2.filePath}#${key}`;
      return accum;
    }, {});
  }

  return config;
}
