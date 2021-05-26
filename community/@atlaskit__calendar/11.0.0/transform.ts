import { API, FileInfo, Options } from 'jscodeshift';
import { applyMotions, hasImportDeclaration } from '@codeshift/utils';

import flattenCertainInnerProps from './motions/flatten-certain-inner-props';
import removeInnerProps from './motions/remove-inner-props';

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  if (!hasImportDeclaration(j, source, '@atlaskit/calendar')) {
    return fileInfo.source;
  }

  applyMotions(j, source, [flattenCertainInnerProps, removeInnerProps]);

  /**
   * Return your modified AST here 👇
   * -----
   * This is where your modified AST will be transformed back into a string
   * and written back to the file.
   */
  return source.toSource(options.printOptions);
}
