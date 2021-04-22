import core, { API, FileInfo, Options } from 'jscodeshift';

import {
  getImportSpecifier,
  getJSXAttributesByName,
  hasImportDeclaration,
  getDefaultImportSpecifier,
} from '@codeshift/utils';

function wrapChildrenProp(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
  specifier: string,
) {
  source.findJSXElements(specifier).forEach(element => {
    const componentProp = getJSXAttributesByName(j, element, 'component').get();
    const componentName = j(componentProp)
      .find(j.JSXExpressionContainer)
      .find(j.Expression)
      .get().value.name;

    const customComponent = j.jsxElement(
      j.jsxOpeningElement(
        j.jsxIdentifier(componentName),
        [j.jsxSpreadAttribute(j.identifier('props'))],
        true,
      ),
    );

    const childrenExpression = j.jsxExpressionContainer(
      j.arrowFunctionExpression(
        [
          j.objectPattern([
            j.objectProperty(j.identifier('ref'), j.identifier('_')),
            j.restProperty(j.identifier('props')),
          ]),
        ],
        customComponent,
      ),
    );

    j(componentProp).remove();
    j(element).replaceWith(
      j.jsxElement(
        j.jsxOpeningElement(
          element.value.openingElement.name,
          element.value.openingElement.attributes,
          false,
        ),
        j.jsxClosingElement(element.value.openingElement.name),
        [childrenExpression],
      ),
    );
  });
}

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(file.source);

  if (!hasImportDeclaration(j, source, '@atlaskit/avatar')) {
    return file.source;
  }

  const defaultSpecifier = getDefaultImportSpecifier(
    j,
    source,
    '@atlaskit/avatar',
  );

  if (defaultSpecifier != null) {
    wrapChildrenProp(j, source, defaultSpecifier);
  }

  const importSpecifier = getImportSpecifier(
    j,
    source,
    '@atlaskit/avatar',
    'AvatarItem',
  );

  if (importSpecifier != null) {
    wrapChildrenProp(j, source, importSpecifier);
  }

  return source.toSource(options.printOptions || { quote: 'single' });
}
