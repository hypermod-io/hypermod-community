import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const isDefaultImport = specifier =>
    specifier.type === 'ImportDefaultSpecifier';
  const getDefaultImport = importDeclaration =>
    importDeclaration.specifiers.find(isDefaultImport);
  const hasDefaultImport = importDeclaration =>
    Boolean(getDefaultImport(importDeclaration));
  const isRelativeImport = importDeclaration =>
    importDeclaration.source.value.startsWith('.');
  const isScriptImport = importDeclaration =>
    !['.json', '.md', '.css', '.svg'].some(ext =>
      importDeclaration.source.value.endsWith(ext),
    );

  return j(file.source)
    .find(j.ImportDeclaration)
    .filter(path => hasDefaultImport(path.value))
    .filter(path => isRelativeImport(path.value))
    .filter(path => isScriptImport(path.value))
    .forEach(path => {
      const importDeclaration = path.value;
      importDeclaration.specifiers = importDeclaration.specifiers.map(
        specifier => {
          if (isDefaultImport(specifier)) {
            const name = specifier.local.name;
            const namedImport = j.importSpecifier(j.identifier(name));
            return namedImport;
          }
          return specifier;
        },
      );
    })
    .toSource(options.printOptions);
}
