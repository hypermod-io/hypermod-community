import { FileInfo, API, Options } from 'jscodeshift';

export type Transform = (
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) => string;

export class ValidationError extends Error {}
export class NoTransformsExistError extends Error {}

export interface Flags {
  /**
   * The transform to run
   */
  transform?: string;
  /**
   * Comma separated list of packages to run transforms for, @scope/package[@version]. If version is supplied, will only run transforms above that version
   */
  packages?: string;
  /**
   * If the package flag is provided, runs all transforms from the provided version to the latest
   */
  sequence?: boolean;
  /**
   * Parser to use for parsing the source files
   */
  parser?: 'babel' | 'babylon' | 'flow' | 'ts' | 'tsx';
  /**
   * Transform files with these file extensions (comma separated list)
   */
  extensions?: string;
  /**
   * Ignore files that match a provided glob expression
   */
  ignorePattern?: string;
}
