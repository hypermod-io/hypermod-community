import core, { ASTPath, Collection, Node } from 'jscodeshift';
import {
  addCommentToStartOfFile,
  getJSXAttributesByName,
  getImportSpecifier,
} from '@codeshift/utils';

const createRemoveFuncFor = (
  component: string,
  importName: string,
  prop: string,
  predicate: (j: core.JSCodeshift, element: ASTPath<any>) => boolean = () =>
    true,
  comment?: string,
) => (j: core.JSCodeshift, source: Collection<Node>) => {
  const specifier = getImportSpecifier(j, source, component, importName);

  if (!specifier) return;

  source.findJSXElements(specifier).forEach(element => {
    if (predicate(j, element) && comment) {
      addCommentToStartOfFile(j, source, comment);
    } else {
      getJSXAttributesByName(j, element, prop).forEach(attribute => {
        j(attribute).remove();
      });
    }
  });
};

export const removeHasSeparator = createRemoveFuncFor(
  '@atlaskit/breadcrumbs',
  'BreadcrumbsItem',
  'hasSeparator',
  (j, element) => j(element).find(j.JSXSpreadAttribute).length > 0,
  `This file uses the @atlaskit/breadcrumbs \`hasSeparator\` prop which
      has now been removed due to its poor performance characteristics. From version 11.0.0, we changed to
      \`css\` pseudo element for the separator and consumer should not use hasSeparator directly anymore.`,
);
