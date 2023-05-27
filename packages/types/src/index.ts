export interface CodeshiftConfig {
  targets?: string[];
  maintainers?: string[];
  description?: string;
  transforms?: Record<string, string>;
  presets?: Record<string, string>;
}

export type DefaultRunner = (
  jscodeshiftOptionOverrides?: object,
  pathsToModify?: string[], //
  transformerPath?: string,
) => Promise<void>;

export interface CustomRunnerCtx<Transform = unknown> {
  pathsToModify: string[]; //
  defaultRunner: DefaultRunner;
  transformInsideFileThatSpecifiesCodeshiftConfig: Transform;
}

export type CustomRunner<
  Transform = unknown, //
  Return = unknown | Promise<unknown>,
> = (ctx: CustomRunnerCtx<Transform>) => Return;

export interface CodeshiftConfig<
  Transform = unknown, //
  RunnerReturn = unknown | Promise<unknown>,
> {
  runner: CustomRunner<Transform, RunnerReturn>;
}
