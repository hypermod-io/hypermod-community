import core, { ASTPath, Collection, Node } from 'jscodeshift';
import {
  insertCommentToStartOfFile,
  getJSXAttributes,
  getImportSpecifierName,
} from '@hypermod/utils';

const createRemoveFuncFor =
  (
    importSource: string,
    importName: string,
    prop: string,
    predicate: (j: core.JSCodeshift, element: ASTPath<any>) => boolean = () =>
      true,
    comment?: string,
  ) =>
  (j: core.JSCodeshift, source: Collection<Node>) => {
    const specifier = getImportSpecifierName(
      j,
      source,
      importName,
      importSource,
    );

    if (!specifier) return;

    source.findJSXElements(specifier).forEach(element => {
      if (predicate(j, element) && comment) {
        insertCommentToStartOfFile(j, source, comment);
      } else {
        getJSXAttributes(j, element, prop).forEach(attribute => {
          j(attribute).remove();
        });
      }
    });
  };

const removeHasSeparator = createRemoveFuncFor(
  '@atlaskit/breadcrumbs',
  'BreadcrumbsItem',
  'hasSeparator',
  (j, element) => j(element).find(j.JSXSpreadAttribute).length > 0,
  `This file uses the @atlaskit/breadcrumbs \`hasSeparator\` prop which
      has now been removed due to its poor performance characteristics. From version 11.0.0, we changed to
      \`css\` pseudo element for the separator and consumer should not use hasSeparator directly anymore.`,
);

export default removeHasSeparator;
