import core, { Collection, Node } from 'jscodeshift';
import {
  insertCommentToStartOfFile,
  getDefaultImportSpecifierName,
  getJSXAttributes,
} from '@hypermod/utils';

const removeInnerProps = (j: core.JSCodeshift, source: Collection<Node>) => {
  const defaultSpecifier = getDefaultImportSpecifierName(
    j,
    source,
    '@atlaskit/calendar',
  );

  if (!defaultSpecifier) return;

  source.findJSXElements(defaultSpecifier).forEach(element => {
    getJSXAttributes(j, element, 'innerProps').forEach(attribute => {
      j(attribute).remove();

      insertCommentToStartOfFile(
        j,
        source,
        `This file uses the @atlaskit/calendar \`innerProps\` which
has now been removed due to its poor performance characteristics. Codemod
has auto flattened 'className' & 'style' properties inside it if present as a standalone props to calendar.
Rest other properties if any inside innerProps will get auto-removed along with it,
& might have to be handled manually as per need.`,
      );
    });
  });
};

export default removeInnerProps;
