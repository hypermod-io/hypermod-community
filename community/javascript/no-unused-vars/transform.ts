import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(file.source);

  // Find all variable declarations in the code
  const declarations = source.find(j.VariableDeclaration).filter(path => {
    // Check if the variable is unused
    // @ts-expect-error
    const varName = path.node.declarations[0].id.name;

    const isUsed =
      j(path.scope.path)
        .find(j.Identifier, { name: varName })
        // Exclude identifiers that are part of a variable declaration
        .filter(
          identifierPath =>
            identifierPath.parent.node.type !== 'VariableDeclarator',
        )
        .size() > 0;

    return !isUsed;
  });

  if (!declarations.length) {
    return file.source;
  }

  // Remove unused variable declarations from the code
  declarations.remove();

  return source.toSource(options.printOptions);
}
