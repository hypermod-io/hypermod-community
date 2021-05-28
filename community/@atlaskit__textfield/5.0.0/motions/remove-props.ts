import core, { Collection, Node } from 'jscodeshift';
import {
  insertCommentToStartOfFile,
  getDefaultImportSpecifierName,
  getJSXAttributesByName,
} from '@codeshift/utils';

export const removeThemeProp = (
  j: core.JSCodeshift,
  source: Collection<Node>,
) => {
  const defaultSpecifier = getDefaultImportSpecifierName(
    j,
    source,
    '@atlaskit/textfield',
  );

  if (!defaultSpecifier) return;

  source.findJSXElements(defaultSpecifier).forEach(element => {
    getJSXAttributesByName(j, element, 'theme')
      .forEach(() => {
        insertCommentToStartOfFile(
          j,
          source,
          `This file uses the @atlaskit/textfield \`theme\` prop which
has now been removed due to its poor performance characteristics. We have not replaced
theme with an equivalent API due to minimal usage of the \`theme\` prop.
The appearance of TextField will have likely changed.`,
        );
      })
      .remove();
  });
};
