import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(file.source);
  const containsJsx = source.find(j.JSXIdentifier).length > 0;

  const containsReactPackageImport =
    source
      .find(j.ImportDeclaration)
      .filter(
        importDeclaration => importDeclaration.node.source.value === 'react',
      ).length > 0;

  const containsReactDefaultImport =
    source
      .find(j.ImportDefaultSpecifier)
      .filter(
        importDefaultSpecifier =>
          importDefaultSpecifier.node.local!.name === 'React',
      ).length > 0;

  if (
    containsJsx &&
    !(containsReactPackageImport && containsReactDefaultImport)
  ) {
    source
      .get()
      .node.program.body.unshift(
        j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier('React'))],
          j.literal('react'),
        ),
      );
  }

  return source.toSource(options.printOptions);
}
