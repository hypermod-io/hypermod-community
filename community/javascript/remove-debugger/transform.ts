import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(file.source);
  const debuggerStatements = source.find(j.DebuggerStatement);

  if (debuggerStatements.length === 0) {
    return file.source;
  }

  debuggerStatements.remove();

  return source.toSource(options.printOptions);
}
