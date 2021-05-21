import core, { ASTPath, JSXElement, Collection } from 'jscodeshift';

import {
  getJSXAttributesByName,
  addCommentToStartOfFile,
} from '@codeshift/utils';

export default function updateOffset(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
) {
  source.findJSXElements(specifier).forEach((path: ASTPath<JSXElement>) => {
    getJSXAttributesByName(j, path, 'offset')
      .find(j.JSXExpressionContainer)
      .forEach(attribute => {
        const expression = attribute.value.expression;
        if (expression.type === 'StringLiteral') {
          const value = expression.value;
          // Not testing for cases like '10 + 10%' because I assume if you're
          // adding or taking numbers it's with units that are not supported
          // and will be picked up by the first case
          if (
            value.includes('%') ||
            value.includes('vw') ||
            value.includes('vh')
          ) {
            addCommentToStartOfFile(
              j,
              source,
              `
                Popper.js has been upgraded from 1.14.1 to 2.4.2,
                and as a result the offset prop has changed to be an array. e.g '0px 8px' -> [0, 8]
                Along with this change you cannot use vw, vh or % units or addition or multiplication
                Change the offset value to use pixel values
                Further details can be found in the popper docs https://popper.js.org/docs/v2/modifiers/offset/
                `,
            );
          } else if (value.includes(',')) {
            // Split by comma
            const offsetArray = expression.value
              .split(',')
              .map(elem => j.literal(parseInt(elem.replace(/\D/g, ''))));
            if (offsetArray.length === 2) {
              j(attribute).replaceWith(
                j.jsxExpressionContainer(j.arrayExpression(offsetArray)),
              );
            }
          } else {
            // Split by space but check if it is a single number
            const offsetArray = expression.value
              .split(' ')
              .filter(elem => elem.length)
              .map(elem => j.literal(parseInt(elem.replace(/\D/g, ''))));
            if (offsetArray.length === 2) {
              j(attribute).replaceWith(
                j.jsxExpressionContainer(j.arrayExpression(offsetArray)),
              );
            } else if (offsetArray.length === 1) {
              j(attribute).replaceWith(
                j.jsxExpressionContainer(
                  j.arrayExpression([offsetArray[0], j.literal(0)]),
                ),
              );
            }
          }
        } else if (expression.type === 'NumericLiteral') {
          // If it is a single number convert to [number, 0]
          j(attribute).replaceWith(
            j.jsxExpressionContainer(
              j.arrayExpression([expression, j.literal(0)]),
            ),
          );
        } else if (expression.type === 'Identifier') {
          // If there is a variable add this comment
          addCommentToStartOfFile(
            j,
            source,
            `
              Popper.js has been upgraded from 1.14.1 to 2.4.2, and as a result the offset
              prop has changed to be an array. e.g '0px 8px' -> [0, 8]
              As you are using a variable, you will have change the offset prop manually
              Further details can be found in the popper docs https://popper.js.org/docs/v2/modifiers/offset/
              `,
          );
        }
      });
  });
}
