import core, { Collection, Node, ObjectExpression } from 'jscodeshift';
import {
  getJSXAttributesByName,
  getDefaultImportSpecifierName,
} from '@codeshift/utils';

const flattenCertainChildProps = (
  j: core.JSCodeshift,
  source: Collection<Node>,
) => {
  const defaultSpecifier = getDefaultImportSpecifierName(
    j,
    source,
    '@atlaskit/calendar',
  );

  if (!defaultSpecifier) return;

  source.findJSXElements(defaultSpecifier).forEach(element => {
    getJSXAttributesByName(j, element, 'innerProps').forEach(attribute => {
      j(attribute)
        .find(j.JSXExpressionContainer)
        .find(j.ObjectExpression)
        .forEach(objectExpression => {
          objectExpression.node.properties.forEach(property => {
            ['style', 'className'].forEach(childProp => {
              if (
                property.type === 'ObjectProperty' &&
                property.key.type === 'Identifier' &&
                property.key.name === childProp &&
                element.node.openingElement.attributes
              ) {
                element.node.openingElement.attributes.push(
                  j.jsxAttribute(
                    j.jsxIdentifier(childProp),
                    j.jsxExpressionContainer(
                      property.value as ObjectExpression,
                    ),
                  ),
                );
              }
            });
          });
        });
    });
  });
};

export default flattenCertainChildProps;
