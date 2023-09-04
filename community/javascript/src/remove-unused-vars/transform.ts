import { API, FileInfo, Options } from 'jscodeshift';
import { isDecendantOfType } from '@hypermod/utils';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(file.source);

  source
    .find(j.VariableDeclaration)
    .filter(
      variableDeclaration =>
        variableDeclaration.parent.value.type !== 'ExportNamedDeclaration',
    )
    .forEach(path => {
      const declaration = path.value.declarations[0];
      if (!declaration) return;

      // @ts-ignore
      const variableName = declaration.id.name;

      // Check if the variable is used elsewhere in the code
      const isUsed =
        source
          .find(j.Identifier, { name: variableName })
          .filter(
            identifier =>
              !isDecendantOfType(j, identifier, j.VariableDeclaration),
          )
          .size() >= 1;

      if (!isUsed) {
        j(path).remove();
      }
    });

  source
    .find(j.FunctionDeclaration)
    .filter(
      functionDeclaration =>
        functionDeclaration.parent.value.type !== 'ExportNamedDeclaration',
    )
    .forEach(path => {
      const functionName = path.value.id?.name;

      // Check if the variable is used elsewhere in the code
      const isUsed =
        source
          .find(j.Identifier, { name: functionName })
          .filter(
            identifier =>
              !isDecendantOfType(j, identifier, j.FunctionDeclaration, {
                id: { name: functionName },
              }),
          )
          .size() >= 1;

      if (!isUsed) {
        j(path).remove();
      }
    });

  return source.toSource(options.printOptions);
}
