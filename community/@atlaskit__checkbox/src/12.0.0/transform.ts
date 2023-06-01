import { API, FileInfo, Options } from 'jscodeshift';
import { applyMotions, hasImportDeclaration } from '@codeshift/utils';

import { removeThemeImports } from './motions/remove-imports';
import {
  removeFullWidth,
  removeOverrides,
  removeTheme,
} from './motions/remove-props';
import {
  renameCheckboxWithoutAnalyticsImport,
  renameDeepTypeImport,
  renameTypeImport,
} from './motions/rename-import';
import { renameInputRef } from './motions/rename-inputRef';

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  if (
    !hasImportDeclaration(j, source, '@atlaskit/checkbox') &&
    !hasImportDeclaration(j, source, '@atlaskit/checkbox/Checkbox') &&
    !hasImportDeclaration(j, source, '@atlaskit/checkbox/types')
  ) {
    return fileInfo.source;
  }

  applyMotions(j, source, [
    removeThemeImports,
    renameCheckboxWithoutAnalyticsImport,
    renameTypeImport,
    renameDeepTypeImport,
    renameInputRef,
    removeFullWidth,
    removeOverrides,
    removeTheme,
  ]);

  return source.toSource(options.printOptions);
}
