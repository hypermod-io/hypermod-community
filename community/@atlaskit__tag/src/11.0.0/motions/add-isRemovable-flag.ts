import core, { JSXAttribute } from 'jscodeshift';
import {
  getJSXAttributes,
  getDefaultImportSpecifierName,
} from '@codeshift/utils';

export const addIsRemovableFlag = (j: core.JSCodeshift, source: any) => {
  const defaultSpecifier = getDefaultImportSpecifierName(
    j,
    source,
    '@atlaskit/tag',
  );

  if (!defaultSpecifier) return;

  source
    .findJSXElements(defaultSpecifier)
    .forEach((element: core.ASTPath<JSXAttribute>) => {
      getJSXAttributes(j, element, 'removeButtonText').forEach(attribute => {
        // @ts-ignore
        const shouldConvert = attribute.node.value.value !== '' || false;
        const node = j.jsxAttribute(j.jsxIdentifier('isRemovable'));
        if (shouldConvert) {
          j(attribute).insertBefore(node);
        }
      });
    });
};
