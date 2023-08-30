import { API, FileInfo, Options } from 'jscodeshift';
import { applyMotions, hasImportDeclaration } from '@hypermod/utils';

import { addIsRemovableFlag } from './motions/add-isRemovable-flag';
import { renameRemoveButtonText } from './motions/rename-remove-button-text';
import { replaceImportStatement } from './motions/replace-import-statements';

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
  if (!hasImportDeclaration(j, source, '@atlaskit/tag')) {
    return fileInfo.source;
  }

  applyMotions(j, source, [
    addIsRemovableFlag,
    renameRemoveButtonText,
    replaceImportStatement,
  ]);

  return source.toSource(options.printOptions);
}
