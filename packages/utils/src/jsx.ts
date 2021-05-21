import core, { ASTPath } from 'jscodeshift';

export function getJSXAttributesByName(
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

export function hasJSXAttributesByName(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  attributeName: string,
) {
  return getJSXAttributesByName(j, element, attributeName).length > 0;
}

export function removeJSXAttributesByName(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  attributeName: string,
) {
  return getJSXAttributesByName(j, element, attributeName).remove();
}
