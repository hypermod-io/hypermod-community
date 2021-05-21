import { API, FileInfo, Options } from 'jscodeshift';
import { hasImportDeclaration, getImportSpecifier } from '@codeshift/utils';

import updateRenderProps from './motions/update-render-props';
import updateOffset from './motions/update-offset';
import updateModifierProp from './motions/update-modifier-prop';

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  /**
   * Early exit condition
   * -----
   * It is often good practice to exit early and return the original source file
   * if it does not contain code relevant to the codemod.
   * See this page for more information:
   * https://codeshiftcommunity.github.io/CodeshiftCommunity/docs/your-first-codemod#output
   */
  if (!hasImportDeclaration(j, source, '@atlaskit/popper')) {
    return fileInfo.source;
  }

  const specifier = getImportSpecifier(j, source, '@atlaskit/popper', 'Popper');

  if (!specifier) return fileInfo.source;

  updateRenderProps(
    j,
    source,
    specifier,
    'outOfBoundaries',
    'isReferenceHidden',
  );
  updateRenderProps(j, source, specifier, 'scheduleUpdate', 'update');
  updateOffset(j, source, specifier);
  updateModifierProp(j, source, specifier);

  /**
   * Return your modified AST here 👇
   * -----
   * This is where your modified AST will be transformed back into a string
   * and written back to the file.
   */
  return source.toSource(options.printOptions);
}
