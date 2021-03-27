import { FileInfo, API, Options } from 'jscodeshift';

export type Transform = (
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) => string;

export class ValidationError extends Error {}
export class NoTransformsExistError extends Error {}
