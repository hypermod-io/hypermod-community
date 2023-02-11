import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(file.source);
  const consoleLogStatements = source.find(j.ExpressionStatement, {
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'console',
        },
        property: {
          type: 'Identifier',
          name: 'log',
        },
      },
    },
  });

  if (consoleLogStatements.length === 0) {
    return file.source;
  }

  consoleLogStatements.remove();

  return source.toSource(options.printOptions);
}
