import core, {
  API,
  Collection,
  FileInfo,
  Options,
  JSXElement,
  JSXAttribute,
} from 'jscodeshift';
import {
  hasImportDeclaration,
  insertCommentToStartOfFile,
  getDefaultImportSpecifierName,
} from '@codeshift/utils';

const relevantEntryPoints = [
  '@atlaskit/button',
  '@atlaskit/button/standard-button',
  '@atlaskit/button/loading-button',
  '@atlaskit/button/custom-theme-button',
];

function getJSXAttributesByName(
  j: core.JSCodeshift,
  element: JSXElement,
  attributeName: string,
): Collection<JSXAttribute> {
  return j(element)
    .find(j.JSXOpeningElement)
    .find(j.JSXAttribute)
    .filter(attribute => {
      const matches = j(attribute)
        // This will find identifiers on nested jsx elements
        // so we are going to do a filter to ensure we are only
        // going one level deep
        .find(j.JSXIdentifier)
        .filter(identifer => {
          j(identifer).closest(j.JSXOpeningElement);
          // Checking we are on the same level as the jsx element
          const closest = j(identifer)
            .closest(j.JSXOpeningElement)
            .nodes()[0];

          if (!closest) {
            return false;
          }
          return (
            closest.name.type === 'JSXIdentifier' &&
            element.openingElement.name.type === 'JSXIdentifier' &&
            element.openingElement.name.name === closest.name.name
          );
        })
        .filter(identifier => identifier.value.name === attributeName);
      return Boolean(matches.length);
    });
}

function renameProp(
  j: core.JSCodeshift,
  base: Collection<any>,
  component: string,
  attributeFrom: string,
  attributeTo: string,
) {
  base.findJSXElements(component).forEach(element => {
    const first = getJSXAttributesByName(j, element.value, attributeFrom);

    // not using attribute
    if (!first.length) return;

    // let's check to see if they are using the to attribute
    const second = getJSXAttributesByName(j, element.value, attributeTo);

    // if the attribute we are moving to already exists we are in trouble
    if (second.length) {
      insertCommentToStartOfFile(
        j,
        base,
        `
        Cannot rename ${attributeFrom} to ${attributeTo} on ${component}.
        A ${component} was detected with both ${attributeFrom} and ${attributeTo} props.
        Please remove the ${attributeFrom} prop and check your tests`,
      );

      return;
    }

    first.find(j.JSXIdentifier).replaceWith(j.jsxIdentifier(attributeTo));
  });
}

function getNamedImportName(
  j: core.JSCodeshift,
  base: Collection<any>,
  originalName: string,
  importPath: string,
) {
  return (
    base
      .find(j.ImportDeclaration)
      .filter(path => path.node.source.value === importPath)
      .find(j.ImportSpecifier)
      .nodes()
      .map(specifier => {
        if (specifier.imported.name === originalName) {
          return specifier.local ? specifier.local.name : originalName;
        }

        return null;
      })
      .filter(Boolean)[0] || null
  );
}

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  if (
    !relevantEntryPoints.some(entryPoint =>
      hasImportDeclaration(j, source, entryPoint),
    )
  ) {
    return fileInfo.source;
  }

  // renaming default imports for entry points
  relevantEntryPoints.forEach(importPath => {
    const defaultName = getDefaultImportSpecifierName(j, source, importPath);

    if (defaultName != null) {
      renameProp(j, source, defaultName, 'data-testid', 'testId');
    }
  });

  // named imports
  const standard = getNamedImportName(
    j,
    source,
    'StandardButton',
    '@atlaskit/button',
  );

  const loading = getNamedImportName(
    j,
    source,
    'LoadingButton',
    '@atlaskit/button',
  );

  const customTheme = getNamedImportName(
    j,
    source,
    'CustomThemeButton',
    '@atlaskit/button',
  );

  [standard, loading, customTheme].forEach(name => {
    if (name != null) {
      renameProp(j, source, name, 'data-testid', 'testId');
    }
  });

  return source.toSource(options.printOptions);
}
