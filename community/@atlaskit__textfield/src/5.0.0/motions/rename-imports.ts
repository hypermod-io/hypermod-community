import core, { Collection } from 'jscodeshift';
import { getImportDeclaration, getImportSpecifierName } from '@hypermod/utils';

function getSafeImportName(
  j: core.JSCodeshift,
  base: Collection<any>,
  currentDefaultSpecifierName: string,
  desiredName: string,
  fallbackName: string,
) {
  if (currentDefaultSpecifierName === desiredName) {
    return desiredName;
  }

  const isUsed =
    base
      .find(j.Identifier)
      .filter(identifer => identifer.value.name === desiredName).length > 0;

  return isUsed ? fallbackName : desiredName;
}

const createRenameJSXFunc =
  (
    packagePath: string,
    from: string,
    to: string,
    fallback: string | undefined = undefined,
  ) =>
  (j: core.JSCodeshift, source: any) => {
    const namedSpecifier = getImportSpecifierName(j, source, packagePath, from);
    const toName = fallback
      ? getSafeImportName(j, source, namedSpecifier!, to, fallback)
      : to;

    const importDeclaration = getImportDeclaration(j, source, packagePath);

    const existingAlias =
      importDeclaration
        .find(j.ImportSpecifier)
        .nodes()
        .map(specifier => {
          if (from !== specifier.imported.name) {
            return null;
          }
          // If aliased: return the alias
          if (specifier.local && from !== specifier.local.name) {
            return specifier.local.name;
          }

          return null;
        })
        .filter(Boolean)[0] || null;

    importDeclaration
      .find(j.ImportSpecifier)
      .filter(importSpecifier => {
        const identifier = j(importSpecifier).find(j.Identifier).get();

        return (
          from === identifier.value.name ||
          existingAlias === identifier.value.name
        );
      })
      .replaceWith([
        j.importSpecifier(
          j.identifier(toName),
          existingAlias ? j.identifier(existingAlias) : null,
        ),
      ]);
  };

export const renamethemeTokensImport = createRenameJSXFunc(
  '@atlaskit/textfield',
  'themeTokens',
  'TextFieldColors',
  'DSTextFieldColors',
);

export const renameThemeAppearanceImport = createRenameJSXFunc(
  '@atlaskit/textfield',
  'ThemeAppearance',
  'Appearance',
  'DSTextFieldAppearance',
);
