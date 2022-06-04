export interface CodeshiftConfig {
  targets?: string[];
  maintainers?: string[];
  description?: string;
  transforms?: Record<string, string>;
  presets?: Record<string, string>;
}
