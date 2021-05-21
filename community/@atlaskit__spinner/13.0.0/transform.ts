import core, { API, Collection, FileInfo, Options } from 'jscodeshift';

import {
  hasImportDeclaration,
  getJSXAttributesByName,
  removeJSXAttributesByName,
  getImportDeclaration,
  getDefaultImportSpecifier,
} from '@codeshift/utils';

// Changing `SpinnerSizes` type to `Size`
function changeTypeName(j: core.JSCodeshift, source: Collection) {
  // Replace 'SpinnerSizes' with 'Size' as import identifier
  getImportDeclaration(j, source, '@atlaskit/spinner')
    .find(j.ImportSpecifier)
    .find(j.Identifier)
    .filter(identifier => identifier.value.name === 'SpinnerSizes')
    .replaceWith(j.identifier('Size'));

  // Want to rename any uses of 'SpinnerSizes' type in the file
  // We only do this if the type is *not* aliased

  // Checking to see if the 'SpinnerSizes' import (now 'Size') type is aliased
  const isTypeImportAliased =
    getImportDeclaration(j, source, '@atlaskit/spinner')
      .find(j.ImportSpecifier)
      .filter(specifier => {
        if (specifier.value.imported.name !== 'Size') {
          return false;
        }
        const isAliased = Boolean(
          specifier.value.local && specifier.value.local.name !== 'Size',
        );

        return isAliased;
      }).length > 0;

  if (isTypeImportAliased) return;

  source
    .find(j.Identifier)
    .filter(identifier => identifier.value.name === 'SpinnerSizes')
    .replaceWith(j.identifier('Size'));
}

function changeSpinnerUsage(j: core.JSCodeshift, source: Collection) {
  const name = getDefaultImportSpecifier(j, source, '@atlaskit/spinner');

  if (name == null) return;

  source.findJSXElements(name).forEach(element => {
    removeJSXAttributesByName(j, element, 'isCompleting');
    removeJSXAttributesByName(j, element, 'onComplete');
    getJSXAttributesByName(j, element, 'delay')
      .filter(attribute => {
        const toRemove = j(attribute)
          .find(j.JSXExpressionContainer)
          // Note: not using j.NumericLiteral as it doesn't play well with flow
          .find(j.Literal)
          .filter(
            literal =>
              typeof literal.value.value === 'number' &&
              literal.value.value <= 150,
          );

        return Boolean(toRemove.length);
      })
      .remove();

    // Changing `invertColor` prop to `appearance`
    getJSXAttributesByName(j, element, 'invertColor').forEach(attribute => {
      // change the name of the prop to appearance
      j(attribute)
        .find(j.JSXIdentifier)
        .replaceWith(j.jsxIdentifier('appearance'));

      // For usages where the `invertColor` had no value (ie a true value):
      // we need to set it to 'invert'`
      j(attribute)
        .filter(attr => attr.node.value == null)
        .replaceWith(
          j.jsxAttribute(
            j.jsxIdentifier('appearance'),
            j.stringLiteral('invert'),
          ),
        );

      // if value is negative (invertColor={false}) then we can remove it
      j(attribute)
        .filter(attr => {
          const isFalse = j(attr)
            .find(j.JSXExpressionContainer)
            .find(j.BooleanLiteral)
            .filter(literal => !literal.node.value);

          return Boolean(isFalse.length);
        })
        .remove();

      // if `invertColor` value is positive we can change it to 'invert'
      j(attribute)
        .find(j.JSXExpressionContainer)
        .filter(
          expression =>
            j(expression)
              .find(j.BooleanLiteral)
              .filter(literal => literal.node.value).length > 0,
        )
        .replaceWith(j.stringLiteral('invert'));

      // if `invertColor` was an expression, then we replace it with a ternary
      j(attribute)
        .find(j.JSXExpressionContainer)
        .filter(container => j(container).find(j.BooleanLiteral).length === 0)
        .forEach(container => {
          j(container).replaceWith(
            j.jsxExpressionContainer(
              j.conditionalExpression(
                // Type 'JSXEmptyExpression' is not assignable to type 'ExpressionKind'.
                // @ts-ignore TS2345
                container.node.expression,
                j.stringLiteral('invert'),
                j.stringLiteral('inherit'),
              ),
            ),
          );
        });
    });
  });
}

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  if (!hasImportDeclaration(j, source, '@atlaskit/spinner')) {
    return fileInfo.source;
  }

  changeSpinnerUsage(j, source);
  changeTypeName(j, source);

  return source.toSource(options.printOptions);
}
