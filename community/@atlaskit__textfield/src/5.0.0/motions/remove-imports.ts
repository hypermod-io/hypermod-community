import core, { Collection, Node } from 'jscodeshift';
import {
  insertCommentToStartOfFile,
  getImportDeclaration,
  hasImportDeclaration,
} from '@hypermod/utils';

export const removeThemeImports = (
  j: core.JSCodeshift,
  source: Collection<Node>,
) => {
  const importsToRemove = ['ThemeProps', 'ThemeTokens', 'Theme'];
  const packagePath = '@atlaskit/textfield';
  const comment = `This file uses exports used to help theme @atlaskit/textfield which
  has now been removed due to its poor performance characteristics.`;

  const isUsingName = hasImportDeclaration(j, source, packagePath);

  if (!isUsingName) return;

  const importDeclarations = getImportDeclaration(j, source, packagePath);

  const existingAliases =
    importDeclarations
      .find(j.ImportSpecifier)
      .nodes()
      .map(specifier => {
        if (!importsToRemove.includes(specifier.imported.name)) {
          return null;
        }
        // If aliased: return the alias
        if (
          specifier.local &&
          !importsToRemove.includes(specifier.local.name)
        ) {
          return specifier.local.name;
        }

        return null;
      })
      .filter(Boolean) || null;

  // Add comments
  importDeclarations
    .find(j.ImportSpecifier)
    .filter(importSpecifier => {
      const identifier = j(importSpecifier).find(j.Identifier).get();

      if (
        importsToRemove.includes(identifier.value.name) ||
        existingAliases.includes(identifier.value.name)
      ) {
        insertCommentToStartOfFile(j, source, comment);
        return true;
      }
      return false;
    })
    .remove();

  // Remove entire import if it is empty
  const isEmptyNamedImport =
    importDeclarations.find(j.ImportSpecifier).find(j.Identifier).length === 0;

  if (isEmptyNamedImport) {
    const isEmptyDefaultImport =
      importDeclarations.find(j.ImportDefaultSpecifier).find(j.Identifier)
        .length === 0;

    isEmptyDefaultImport
      ? importDeclarations.remove()
      : importDeclarations.find(j.ImportSpecifier).remove();
  }
};
