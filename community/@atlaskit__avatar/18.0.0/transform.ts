import core, {
  API,
  ASTPath,
  FileInfo,
  MemberExpression,
  Options,
} from 'jscodeshift';

import {
  hasImportDeclaration,
  getDefaultImportSpecifier,
  getImportSpecifier,
  getImportDeclaration,
  getJSXAttributesByName,
} from '@codeshift/utils';

function updateAvatarProps(j: core.JSCodeshift, source: ReturnType<typeof j>) {
  const defaultSpecifier = getDefaultImportSpecifier(
    j,
    source,
    '@atlaskit/avatar',
  );

  if (!defaultSpecifier) return;

  source.findJSXElements(defaultSpecifier).forEach(element => {
    getJSXAttributesByName(j, element, 'isHover').remove();
    getJSXAttributesByName(j, element, 'isActive').remove();
    getJSXAttributesByName(j, element, 'isFocus').remove();
    getJSXAttributesByName(j, element, 'isSelected').remove();
    getJSXAttributesByName(j, element, 'theme').remove();

    const nameAttributes = getJSXAttributesByName(j, element, 'name');
    const name = nameAttributes.length && nameAttributes.get();
    const enableTooltipAttributes = getJSXAttributesByName(
      j,
      element,
      'enableTooltip',
    );
    const enableTooltipValue =
      enableTooltipAttributes.length && enableTooltipAttributes;

    const hasDefaultTrue = !!enableTooltipAttributes.filter(
      attr => attr.node.value == null,
    ).length;

    const hasTruthy = !!enableTooltipAttributes
      .find(j.JSXExpressionContainer)
      .find(j.BooleanLiteral)
      .filter(literal => literal.node.value).length;

    const hasFalsy = !!enableTooltipAttributes
      .find(j.JSXExpressionContainer)
      .find(j.BooleanLiteral)
      .filter(literal => literal.node.value === false).length;

    const hasExpression = !!enableTooltipAttributes
      .find(j.JSXExpressionContainer)
      .filter(container => j(container).find(j.BooleanLiteral).length === 0)
      .length;

    const shouldWrapAvatar =
      !hasFalsy || hasDefaultTrue || hasTruthy || hasExpression;

    if (shouldWrapAvatar && name) {
      getImportDeclaration(j, source, '@atlaskit/avatar').forEach(
        importDeclaration => {
          j(importDeclaration).replaceWith([
            j.importDeclaration(
              [j.importDefaultSpecifier(j.identifier('Tooltip'))],
              j.literal('@atlaskit/tooltip'),
            ),
            importDeclaration.value,
          ]);
        },
      );

      const wrappedAvatar = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier('Tooltip'), [
          j.jsxAttribute(j.jsxIdentifier('content'), name.value.value),
        ]),
        j.jsxClosingElement(j.jsxIdentifier('Tooltip')),
        [
          j.jsxElement(
            element.value.openingElement,
            element.value.closingElement,
            element.value.children,
          ),
        ],
      );

      if (hasExpression && enableTooltipValue) {
        j(element).replaceWith([
          j.conditionalExpression(
            enableTooltipValue.find(j.JSXExpressionContainer).get().value
              .expression,
            wrappedAvatar,
            element.value,
          ),
        ]);
      } else {
        j(element).replaceWith([wrappedAvatar]);
      }
    }

    enableTooltipValue && enableTooltipValue.remove();
  });
}

function updateAvatarItemProps(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
) {
  const importSpecifier = getImportSpecifier(
    j,
    source,
    '@atlaskit/avatar',
    'AvatarItem',
  );

  if (!importSpecifier) return;

  source.findJSXElements(importSpecifier).forEach(element => {
    getJSXAttributesByName(j, element, 'isHover').remove();
    getJSXAttributesByName(j, element, 'isActive').remove();
    getJSXAttributesByName(j, element, 'isFocus').remove();
    getJSXAttributesByName(j, element, 'isSelected').remove();
    getJSXAttributesByName(j, element, 'theme').remove();
    getJSXAttributesByName(j, element, 'enableTextTruncate').forEach(
      attribute => {
        // Change the prop name to isTruncationDisabled
        j(attribute)
          .find(j.JSXIdentifier)
          .replaceWith(j.jsxIdentifier('isTruncationDisabled'));

        // Remove if enableTextTruncate was true or given no value (ie true)
        j(attribute)
          .filter(attr => attr.node.value == null)
          .remove();

        j(attribute)
          .filter(attr => {
            return !!j(attr)
              .find(j.JSXExpressionContainer)
              .find(j.BooleanLiteral)
              .filter(literal => literal.node.value).length;
          })
          .remove();

        // if `enableTextTruncate` value is negative we can change it to 'true'
        j(attribute)
          .filter(
            attr =>
              !!j(attr)
                .find(j.JSXExpressionContainer)
                .filter(
                  expression =>
                    j(expression)
                      .find(j.BooleanLiteral)
                      .filter(literal => !literal.node.value).length > 0,
                ).length,
          )
          .replaceWith(j.jsxAttribute(j.jsxIdentifier('isTruncationDisabled')));

        // if `enableTextTruncate` was an expression, negate it
        j(attribute)
          .find(j.JSXExpressionContainer)
          .filter(container => j(container).find(j.BooleanLiteral).length === 0)
          .forEach(container => {
            j(container).replaceWith(
              j.jsxExpressionContainer(
                //@ts-ignore
                j.unaryExpression('!', container.node.expression),
              ),
            );
          });
      },
    );
  });
}

function updateBorderWidthUsage(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
) {
  source
    .find(j.MemberExpression)
    .filter(
      (memberExpression: ASTPath<MemberExpression>) =>
        // @ts-ignore
        memberExpression.value.object.name === 'BORDER_WIDTH',
    )
    .forEach((memberExpression: ASTPath<MemberExpression>) => {
      if (memberExpression.value.property) {
        j(memberExpression).replaceWith(
          // @ts-ignore
          j.identifier(memberExpression.value.object.name),
        );
      }
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

  updateBorderWidthUsage(j, source);
  updateAvatarProps(j, source);
  updateAvatarItemProps(j, source);

  return source.toSource(options.printOptions || { quote: 'single' });
}
