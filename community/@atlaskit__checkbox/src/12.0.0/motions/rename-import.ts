import core, {
  ImportDefaultSpecifier,
  ImportSpecifier,
  Node,
  Collection,
} from 'jscodeshift';

import { hasImportDeclaration, getImportDeclaration } from '@codeshift/utils';

function addToImport({
  j,
  base,
  importSpecifier,
  packageName,
}: {
  j: core.JSCodeshift;
  base: Collection<any>;
  importSpecifier: ImportSpecifier | ImportDefaultSpecifier;
  packageName: string;
}) {
  getImportDeclaration(j, base, packageName).replaceWith(declaration =>
    j.importDeclaration(
      [
        // we are appending to the existing specifiers
        // We are doing a filter hear because sometimes specifiers can be removed
        // but they hand around in the declaration
        ...(declaration.value.specifiers || []).filter(
          item => item.type === 'ImportSpecifier' && item.imported != null,
        ),
        importSpecifier,
      ],
      j.literal(packageName),
    ),
  );
}

const createRenameImportFor =
  ({
    componentName,
    newComponentName,
    oldPackagePath,
    newPackagePath,
  }: {
    componentName: string;
    newComponentName?: string;
    oldPackagePath: string;
    newPackagePath: string;
  }) =>
  (j: core.JSCodeshift, source: Collection<Node>) => {
    const isUsingName =
      getImportDeclaration(j, source, oldPackagePath)
        .find(j.ImportSpecifier)
        .nodes()
        .filter(
          specifier =>
            specifier.imported && specifier.imported.name === componentName,
        ).length > 0;

    if (!isUsingName) return;

    const existingAlias =
      getImportDeclaration(j, source, oldPackagePath)
        .find(j.ImportSpecifier)
        .nodes()
        .map(specifier => {
          if (specifier.imported && specifier.imported.name !== componentName) {
            return null;
          }
          // If aliased: return the alias
          if (specifier.local && specifier.local.name !== componentName) {
            return specifier.local.name;
          }

          return null;
        })
        .filter(Boolean)[0] || null;

    // Check to see if need to create new package path
    // Try create an import declaration just before the old import
    if (!hasImportDeclaration(j, source, newPackagePath)) {
      getImportDeclaration(j, source, oldPackagePath).insertBefore(
        j.importDeclaration([], j.literal(newPackagePath)),
      );
    }

    const newSpecifier: ImportSpecifier | ImportDefaultSpecifier = (() => {
      // If there's a new name use that
      if (newComponentName) {
        return j.importSpecifier(
          j.identifier(newComponentName),
          j.identifier(newComponentName),
        );
      }

      if (existingAlias) {
        return j.importSpecifier(
          j.identifier(componentName),
          j.identifier(existingAlias),
        );
      }

      // Add specifier
      return j.importSpecifier(
        j.identifier(componentName),
        j.identifier(componentName),
      );
    })();

    addToImport({
      j,
      base: source,
      importSpecifier: newSpecifier,
      packageName: newPackagePath,
    });

    // Remove old path
    source
      .find(j.ImportDeclaration)
      .filter(path => path.node.source.value === oldPackagePath)
      .remove();
  };

// As you could access everything in Checkbox with the old entry points
// there are a lot of possible things to fix. Having searched on SourceTree
// these are the only things that need to be fixed

export const renameTypeImport = createRenameImportFor({
  componentName: 'CheckboxProps',
  oldPackagePath: '@atlaskit/checkbox/types',
  newPackagePath: '@atlaskit/checkbox',
});

export const renameDeepTypeImport = createRenameImportFor({
  componentName: 'CheckboxProps',
  oldPackagePath: '@atlaskit/checkbox/dist/cjs/types',
  newPackagePath: '@atlaskit/checkbox',
});

export const renameCheckboxWithoutAnalyticsImport = createRenameImportFor({
  componentName: 'CheckboxWithoutAnalytics',
  newComponentName: 'Checkbox',
  oldPackagePath: '@atlaskit/checkbox/Checkbox',
  newPackagePath: '@atlaskit/checkbox',
});
