import { API, FileInfo, Options } from 'jscodeshift';
import {
  hasImportDeclaration,
  getDefaultImportSpecifierName,
  getImportSpecifierName,
} from '@codeshift/utils';

import updateBoundariesProps from './motions/update-boundaries-props';
import updateOffset from './motions/update-offset';
import updateRenderProps from './motions/update-render-props';

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  if (!hasImportDeclaration(j, source, '@atlaskit/popup')) {
    return fileInfo.source;
  }

  // Get imported name for the component
  let specifier = getDefaultImportSpecifierName(j, source, '@atlaskit/popup');

  if (!specifier) {
    specifier = getImportSpecifierName(j, source, '@atlaskit/popup', 'Popup');
  }

  if (!specifier) {
    return fileInfo.source;
  }

  updateBoundariesProps(j, source, specifier);
  updateOffset(j, source, specifier);
  updateRenderProps(j, source, specifier, 'scheduleUpdate', 'update');

  return source.toSource(options.printOptions);
}
