import { API, FileInfo, Options } from 'jscodeshift';
import { applyMotions, hasImportDeclaration } from '@codeshift/utils';

import { SECTION_MESSAGE_PACKAGE_NAME } from './constants';
import { getDynamicImportName } from './utils';
import changeAppearanceProp from './motions/change-appearance-prop';
import mapActionsProp from './motions/map-actions-prop';

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  if (
    !hasImportDeclaration(j, source, SECTION_MESSAGE_PACKAGE_NAME) &&
    !getDynamicImportName(j, source, SECTION_MESSAGE_PACKAGE_NAME)
  ) {
    return fileInfo.source;
  }

  applyMotions(j, source, [changeAppearanceProp, mapActionsProp]);

  return source.toSource(options.printOptions);
}
