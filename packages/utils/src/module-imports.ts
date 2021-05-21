import core, {
  Collection,
  ImportSpecifier,
  ImportDefaultSpecifier,
} from 'jscodeshift';

export function hasImportDeclaration(
  j: core.JSCodeshift,
  source: Collection<any>,
  sourcePath: string,
) {
  return !!source
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === sourcePath).length;
}

export function getImportDeclaration(
  j: core.JSCodeshift,
  source: Collection<any>,
  sourcePath: string,
) {
  return source
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === sourcePath);
}

export function removeImportDeclaration(
  j: core.JSCodeshift,
  source: Collection<any>,
  sourcePath: string,
) {
  getImportDeclaration(j, source, sourcePath).remove();
}

export function getDefaultImportSpecifier(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
) {
  const specifiers = source
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === specifier)
    .find(j.ImportDefaultSpecifier);

  if (!specifiers.length) return null;

  return specifiers.nodes()[0]!.local!.name;
}

export function getImportSpecifier(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
  imported: string,
) {
  const specifiers = source
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === specifier)
    .find(j.ImportSpecifier)
    .filter(path => path.value.imported.name === imported);

  if (!specifiers.length) return null;

  return specifiers.nodes()[0]!.local!.name;
}

export function insertImportSpecifier(
  j: core.JSCodeshift,
  source: Collection<any>,
  importSpecifier: ImportSpecifier | ImportDefaultSpecifier,
  sourcePath: string,
) {
  getImportDeclaration(j, source, sourcePath).replaceWith(declaration =>
    j.importDeclaration(
      [
        // we are appending to the existing specifiers
        // We are doing a filter hear because sometimes specifiers can be removed
        // but they hang around in the declaration
        ...(declaration.value.specifiers || []).filter(
          item => item.type === 'ImportSpecifier' && item.imported != null,
        ),
        importSpecifier,
      ],
      j.literal(sourcePath),
    ),
  );
}
