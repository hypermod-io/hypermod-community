import core, { ASTPath } from 'jscodeshift';

export function getJSXAttributes(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  attributeName: string,
) {
  return j(element)
    .find(j.JSXOpeningElement)
    .find(j.JSXAttribute)
    .filter(attribute => {
      const matches = j(attribute)
        .find(j.JSXIdentifier)
        .filter(identifier => identifier.value.name === attributeName);
      return Boolean(matches.length);
    });
}

export function hasJSXAttributes(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  attributeName: string,
) {
  return getJSXAttributes(j, element, attributeName).length > 0;
}

export function removeJSXAttributes(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  attributeName: string,
) {
  return getJSXAttributes(j, element, attributeName).remove();
}
