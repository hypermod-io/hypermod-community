import core, {
  API,
  FileInfo,
  Options,
  Collection,
  ImportSpecifier,
  ImportDefaultSpecifier,
} from 'jscodeshift';
import {
  hasImportDeclaration,
  removeImportDeclaration,
  insertImportSpecifier,
  getDefaultImportSpecifierName,
  removeDefaultImportSpecifier,
} from '@hypermod/utils';

function tryCreateImport(
  j: core.JSCodeshift,
  base: Collection<any>,
  relativeToPackage: string,
  packageName: string,
) {
  const exists =
    base
      .find(j.ImportDeclaration)
      .filter(path => path.value.source.value === packageName).length > 0;

  if (exists) return;

  base
    .find(j.ImportDeclaration)
    .filter(path => path.value.source.value === relativeToPackage)
    .insertBefore(j.importDeclaration([], j.literal(packageName)));
}

type Option =
  | {
      type: 'change-name';
      oldName: string;
      newName: string;
      fallbackNameAlias: string;
    }
  | {
      type: 'keep-name';
      name: string;
      behaviour: 'move-to-default-import' | 'keep-as-named-import';
    };

function changeImportFor(
  j: core.JSCodeshift,
  base: Collection<any>,
  option: Option,
  oldPackagePath: string,
  newPackagePath: string,
) {
  const currentName =
    option.type === 'change-name' ? option.oldName : option.name;
  const desiredName =
    option.type === 'change-name' ? option.newName : option.name;

  const isUsingName =
    base
      .find(j.ImportDeclaration)
      .filter(path => path.node.source.value === oldPackagePath)
      .find(j.ImportSpecifier)
      .find(j.Identifier)
      .filter(identifier => identifier.value.name === currentName).length > 0;

  if (!isUsingName) return;

  const existingAlias =
    base
      .find(j.ImportDeclaration)
      .filter(path => path.node.source.value === oldPackagePath)
      .find(j.ImportSpecifier)
      .nodes()
      .map(specifier => {
        if (specifier.imported.name !== currentName) {
          return null;
        }
        // If aliased: return the alias
        if (specifier.local && specifier.local.name !== currentName) {
          return specifier.local.name;
        }

        return null;
      })
      .filter(Boolean)[0] || null;

  base
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === oldPackagePath)
    .find(j.ImportSpecifier)
    .filter(specifier => {
      if (specifier.value.imported!.name === currentName) {
        return true;
      }
      if (specifier.value.imported!.name === existingAlias) {
        return true;
      }
      return false;
    })
    .remove();

  // Check to see if need to create new package path
  // Try create an import declaration just before the old import
  tryCreateImport(j, base, oldPackagePath, newPackagePath);

  if (option.type === 'keep-name') {
    const newSpecifier: ImportSpecifier | ImportDefaultSpecifier = (() => {
      if (option.behaviour === 'keep-as-named-import') {
        if (existingAlias) {
          return j.importSpecifier(
            j.identifier(desiredName),
            j.identifier(existingAlias),
          );
        }

        return j.importSpecifier(j.identifier(desiredName));
      }

      // moving to default specifier
      return j.importDefaultSpecifier(
        j.identifier(existingAlias || desiredName),
      );
    })();

    // We don't need to touch anything else in the file
    insertImportSpecifier(j, base, newSpecifier, newPackagePath);

    return;
  }

  const isNewNameAvailable: boolean =
    base.find(j.Identifier).filter(i => i.value.name === option.newName)
      .length === 0;

  const newSpecifier: ImportSpecifier = (() => {
    if (existingAlias) {
      return j.importSpecifier(
        j.identifier(desiredName),
        j.identifier(existingAlias),
      );
    }

    if (isNewNameAvailable) {
      return j.importSpecifier(j.identifier(desiredName));
    }

    // new type name is not available: need to use a new alias
    return j.importSpecifier(
      j.identifier(desiredName),
      j.identifier(option.fallbackNameAlias),
    );
  })();

  insertImportSpecifier(j, base, newSpecifier, newPackagePath);

  // Change usages of old type in file
  base
    .find(j.Identifier)
    .filter(identifier => identifier.value.name === option.oldName)
    .replaceWith(
      j.identifier(
        isNewNameAvailable ? option.newName : option.fallbackNameAlias,
      ),
    );
}

function changeType(
  j: core.JSCodeshift,
  base: Collection<any>,
  oldName: string,
  newName: string,
  fallbackNameAlias: string,
) {
  changeImportFor(
    j,
    base,
    {
      type: 'change-name',
      oldName,
      newName,
      fallbackNameAlias,
    },
    '@atlaskit/button',
    '@atlaskit/button/types',
  );
  changeImportFor(
    j,
    base,
    {
      type: 'change-name',
      oldName,
      newName,
      fallbackNameAlias,
    },
    '@atlaskit/button/types',
    '@atlaskit/button/types',
  );
}

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  // Exit early if not relevant
  // We are doing this so we don't touch the formatting of unrelated files
  const willChange =
    hasImportDeclaration(j, source, '@atlaskit/button') ||
    hasImportDeclaration(j, source, '@atlaskit/button/types');

  if (!willChange) return;

  changeType(
    j,
    source,
    'ButtonAppearances',
    'Appearance',
    'DSButtonAppearance',
  );

  changeImportFor(
    j,
    source,
    // Not changing the name
    {
      type: 'keep-name',
      name: 'Theme',
      behaviour: 'keep-as-named-import',
    },
    '@atlaskit/button',
    '@atlaskit/button/custom-theme-button',
  );

  changeImportFor(
    j,
    source,
    {
      type: 'keep-name',
      name: 'ButtonGroup',
      behaviour: 'move-to-default-import',
    },
    '@atlaskit/button',
    '@atlaskit/button/button-group',
  );

  changeType(
    j,
    source,
    'ButtonProps',
    'CustomThemeButtonProps',
    'DSCustomThemeButtonProps',
  );

  const defaultName = getDefaultImportSpecifierName(
    j,
    source,
    '@atlaskit/button',
  );

  if (defaultName) {
    tryCreateImport(
      j,
      source,
      '@atlaskit/button',
      '@atlaskit/button/custom-theme-button',
    );

    insertImportSpecifier(
      j,
      source,
      j.importDefaultSpecifier(j.identifier(defaultName)),
      '@atlaskit/button/custom-theme-button',
    );

    // removing old default specifier
    removeDefaultImportSpecifier(j, source, '@atlaskit/button');
  }

  removeImportDeclaration(j, source, '@atlaskit/button');

  return source.toSource(options.printOptions);
}
