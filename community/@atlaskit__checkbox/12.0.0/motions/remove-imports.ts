import core, { Node, Collection } from 'jscodeshift';
import {
  insertCommentToStartOfFile,
  getImportDeclaration,
  hasImportDeclaration,
} from '@codeshift/utils';

const createRemoveImportsFor = ({
  importsToRemove,
  packagePath,
  comment,
}: {
  importsToRemove: string[];
  packagePath: string;
  comment: string;
}) => (j: core.JSCodeshift, source: Collection<Node>) => {
  const isUsingName = hasImportDeclaration(j, source, packagePath);

  if (!isUsingName) return;

  const existingAlias =
    getImportDeclaration(j, source, packagePath)
      .find(j.ImportSpecifier)
      .nodes()
      .map(specifier => {
        if (!importsToRemove.includes(specifier.imported.name)) return null;

        // If aliased: return the alias
        if (
          specifier.local &&
          !importsToRemove.includes(specifier.local.name)
        ) {
          return specifier.local.name;
        }

        return null;
      })
      .filter(Boolean)[0] || null;

  // Remove imports
  getImportDeclaration(j, source, packagePath)
    .find(j.ImportSpecifier)
    .find(j.Identifier)
    .filter(identifier => {
      if (
        importsToRemove.includes(identifier.value.name) ||
        identifier.value.name === existingAlias
      ) {
        insertCommentToStartOfFile(j, source, comment);
        return true;
      }
      return false;
    })
    .remove();

  // Remove entire import if it is empty
  const isEmptyImport =
    getImportDeclaration(j, source, packagePath)
      .find(j.ImportSpecifier)
      .find(j.Identifier).length === 0;

  if (isEmptyImport) {
    getImportDeclaration(j, source, packagePath).remove();
  }
};

export const removeThemeImports = createRemoveImportsFor({
  importsToRemove: ['ComponentTokens', 'ThemeFn'],
  packagePath: '@atlaskit/checkbox/types',
  comment: `This file uses exports used to help theme @atlaskit/checkbox which
  has now been removed due to its poor performance characteristics. We have not replaced
  theme with an equivalent API due to minimal usage of the theming.
  The appearance of Checkbox will have likely changed.`,
});
