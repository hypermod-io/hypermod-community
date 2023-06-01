import core, {
  FileInfo,
  API,
  ASTPath,
  ImportDeclaration,
  ImportSpecifier,
  Options,
} from 'jscodeshift';

function buildCoreImportDeclaration(
  j: core.JSCodeshift,
  path: ASTPath<ImportDeclaration>,
) {
  const coreExports = ['css', 'keyframes'];
  const specifiers: ImportSpecifier[] = [];

  j(path)
    .find(j.ImportSpecifier)
    .filter((specifier: any) =>
      coreExports.includes(specifier.value.imported.name),
    )
    .forEach((specifier: any) => {
      specifiers.push(
        j.importSpecifier(j.identifier(specifier.value.imported.name)),
      );
    });

  return specifiers.length
    ? j.importDeclaration(specifiers, j.literal('@emotion/core'))
    : null;
}

function buildStyledImportDeclaration(
  j: core.JSCodeshift,
  path: ASTPath<ImportDeclaration>,
) {
  const specifier = j(path)
    .find(j.ImportDefaultSpecifier)
    .filter((specifier: any) => specifier.value.local!.name === 'styled');

  return specifier && specifier.length
    ? j.importDeclaration(
        [
          j.importDefaultSpecifier(
            j.identifier(specifier.get(0).node.local!.name),
          ),
        ],
        j.literal('@emotion/styled'),
      )
    : null;
}

function buildThemingImportDeclaration(
  j: core.JSCodeshift,
  path: ASTPath<ImportDeclaration>,
) {
  const themingExports = ['ThemeProvider', 'withTheme'];
  const specifiers: ImportSpecifier[] = [];

  j(path)
    .find(j.ImportSpecifier)
    .filter((specifier: any) =>
      themingExports.includes(specifier.value.imported.name),
    )
    .forEach((specifier: any) => {
      specifiers.push(
        j.importSpecifier(j.identifier(specifier.value.imported.name)),
      );
    });

  return specifiers && specifiers.length
    ? j.importDeclaration(specifiers, j.literal('emotion-theming'))
    : null;
}

/**
 * Converts all imports of `styled-components` to `@emotion/styled`
 */
export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source)
    .find(j.ImportDeclaration)
    .filter((path: any) => path.node.source.value === 'styled-components')
    .forEach((path: any) => {
      j(path).replaceWith([
        buildCoreImportDeclaration(j, path),
        buildStyledImportDeclaration(j, path),
        buildThemingImportDeclaration(j, path),
      ]);
    })
    .toSource(options.printOptions || { quote: 'single' });

  return source;
}
