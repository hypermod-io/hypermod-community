import core, { Collection, JSXElement } from 'jscodeshift';
import { insertCommentToStartOfFile, hasJSXAttributes } from '@hypermod/utils';
import { NodePath } from 'ast-types/lib/node-path';

import { messageForModifierProps } from '../constants';

function isUsingSupportedSpread({
  j,
  base,
  element,
}: {
  j: core.JSCodeshift;
  base: Collection<any>;
  element: NodePath<JSXElement, JSXElement>;
}) {
  const isUsingSpread = j(element).find(j.JSXSpreadAttribute).length > 0;

  if (!isUsingSpread) return true;

  return (
    j(element)
      .find(j.JSXSpreadAttribute)
      .filter(spread => {
        const argument = spread.value.argument;
        // in place expression is supported
        if (argument.type === 'ObjectExpression') {
          return true;
        }

        // Supporting identifiers that point to an a local object expression
        if (argument.type === 'Identifier') {
          return (
            base.find(j.VariableDeclarator).filter((declarator): boolean => {
              return (
                declarator.value.id.type === 'Identifier' &&
                // @ts-ignore
                declarator.value.init.type === 'ObjectExpression'
              );
            }).length > 0
          );
        }

        // We don't support anything else
        return false;
      }).length > 0
  );
}

function isUsingThroughSpread({
  j,
  base,
  element,
  propName,
}: {
  j: core.JSCodeshift;
  base: Collection<any>;
  element: NodePath<JSXElement, JSXElement>;
  propName: string;
}): boolean {
  if (!isUsingSupportedSpread({ j, base, element })) {
    return false;
  }

  const isUsedThroughExpression: boolean =
    j(element)
      .find(j.JSXSpreadAttribute)
      .find(j.ObjectExpression)
      .filter(item => {
        const match: boolean =
          item.value.properties.filter(
            property =>
              property.type === 'ObjectProperty' &&
              property.key.type === 'Identifier' &&
              property.key.name === propName,
          ).length > 0;

        return match;
      }).length > 0;

  if (isUsedThroughExpression) {
    return true;
  }

  const isUsedThroughIdentifier: boolean =
    j(element)
      .find(j.JSXSpreadAttribute)
      .find(j.Identifier)
      .filter((identifier): boolean => {
        return (
          base
            .find(j.VariableDeclarator)
            .filter(
              declarator =>
                declarator.value.id.type === 'Identifier' &&
                declarator.value.id.name === identifier.value.name,
            )
            .filter(declarator => {
              const value = declarator.value;
              if (value.id.type !== 'Identifier') {
                return false;
              }

              if (value.id.name !== identifier.value.name) {
                return false;
              }
              // @ts-ignore
              if (value.init.type !== 'ObjectExpression') {
                return false;
              }

              const match: boolean =
                // @ts-ignore
                value.init.properties.filter(
                  // @ts-ignore
                  property =>
                    property.type === 'ObjectProperty' &&
                    property.key.type === 'Identifier' &&
                    property.key.name === propName,
                ).length > 0;

              return match;
            }).length > 0
        );
      }).length > 0;

  return isUsedThroughIdentifier;
}

function isUsingProp({
  j,
  base,
  element,
  propName,
}: {
  j: core.JSCodeshift;
  base: Collection<any>;
  element: NodePath<JSXElement, JSXElement>;
  propName: string;
}): boolean {
  return (
    hasJSXAttributes(j, element, propName) ||
    isUsingThroughSpread({
      j,
      base,
      element,
      propName,
    })
  );
}

export default function updateModifierProp(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
) {
  source.findJSXElements(specifier).forEach(element => {
    if (isUsingProp({ j, base: source, element, propName: 'modifiers' })) {
      insertCommentToStartOfFile(j, source, messageForModifierProps);
    }
  });
}
