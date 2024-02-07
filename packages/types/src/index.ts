export interface Config {
  targets?: string[];
  maintainers?: string[];
  description?: string;
  transforms?: Record<string, string>;
  presets?: Record<string, string>;
}

export type CodeshiftConfig = Config;
