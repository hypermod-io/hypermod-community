import core, {
  ASTPath,
  JSXElement,
  JSXExpressionContainer,
  StringLiteral,
  Literal,
  Collection,
} from 'jscodeshift';
import {
  getJSXAttributesByName,
  addCommentToStartOfFile,
} from '@codeshift/utils';

import {
  messageForUsingExpression,
  messageForUsingVariable,
} from '../constants';

const updateOffsetNumbers = (
  value: string,
  j: core.JSCodeshift,
  attribute: ASTPath<any>,
) => {
  if (value.includes(',')) {
    // Split by comma
    const offsetArray: Literal[] = value
      .split(',')
      //@ts-ignore
      .map(elem => j.literal(parseInt(elem.replace(/\D/g, ''))));
    if (offsetArray.length === 2) {
      j(attribute).replaceWith(
        j.jsxExpressionContainer(j.arrayExpression(offsetArray)),
      );
    }
  } else {
    // Split by space but check if it is a single number
    const offsetArray: Literal[] = value
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
};

export default function updateOffset(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
) {
  source.findJSXElements(specifier).forEach((path: ASTPath<JSXElement>) => {
    const offsetExpr = getJSXAttributesByName(j, path, 'offset');
    const stringLiteral = offsetExpr.filter(
      attr => attr.value!.value!.type === 'StringLiteral',
    );

    const expression = offsetExpr.filter(
      attr => attr.value!.value!.type === 'JSXExpressionContainer',
    );

    if (stringLiteral.length > 0) {
      stringLiteral.find(StringLiteral).forEach(attribute => {
        const expression = attribute.value;
        updateOffsetNumbers(expression.value, j, attribute);
      });
    } else {
      expression.find(JSXExpressionContainer).forEach(attribute => {
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
            addCommentToStartOfFile(j, source, messageForUsingExpression);
          } else {
            updateOffsetNumbers(value, j, attribute);
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
          addCommentToStartOfFile(j, source, messageForUsingVariable);
        }
      });
    }
  });
}
