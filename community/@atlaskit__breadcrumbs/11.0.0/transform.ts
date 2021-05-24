import { API, FileInfo, Options } from 'jscodeshift';
import { hasImportDeclaration, applyMotions } from '@codeshift/utils';

import elevateStatelessToDefault from './motions/elevate-stateless-to-default';
import removeHasSeparator from './motions/remove-has-separator';
import renameBreadcrumbs from './motions/rename-breadcrumbs';

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
  if (!hasImportDeclaration(j, source, '@atlaskit/breadcrumbs')) {
    return fileInfo.source;
  }

  /**
   * Codemod logic goes here 👇
   * -----
   * This is where the core logic for your codemod will go,
   * consider grouping specific actions into 'motions' and running them in sequence
   *
   * See this page for more information:
   * https://codeshiftcommunity.github.io/CodeshiftCommunity/docs/authoring#motions
   */
  applyMotions(j, source, [
    removeHasSeparator,
    elevateStatelessToDefault,
    renameBreadcrumbs,
  ]);

  /**
   * Return your modified AST here 👇
   * -----
   * This is where your modified AST will be transformed back into a string
   * and written back to the file.
   */
  return source.toSource(options.printOptions);
}
