import core from 'jscodeshift';

export function hasImportDeclaration(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
  importPath: string,
) {
  return !!source
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === importPath).length;
}

export function getImportDeclaration(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
  importPath: string,
) {
  return source
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === importPath);
}

export function getDefaultImportSpecifier(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
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
  source: ReturnType<typeof j>,
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
