import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(file.source);

  source.find(j.VariableDeclaration, { kind: 'var' }).forEach(p => {
    const letStatement = j.variableDeclaration('let', p.value.declarations);
    letStatement.comments = p.value.comments;
    return j(p).replaceWith(letStatement);
  });

  return source.toSource(options.printOptions);
}
