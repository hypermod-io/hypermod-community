import { API, FileInfo, Options } from 'jscodeshift';
import { applyMotions, hasImportDeclaration } from '@codeshift/utils';

import { removeThemeImports } from './motions/remove-imports';
import { removeThemeProp } from './motions/remove-props';
import {
  renameThemeAppearanceImport,
  renamethemeTokensImport,
} from './motions/rename-imports';

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  if (!hasImportDeclaration(j, source, '@atlaskit/textfield')) {
    return fileInfo.source;
  }

  applyMotions(j, source, [
    removeThemeProp,
    removeThemeImports,
    renamethemeTokensImport,
    renameThemeAppearanceImport,
  ]);

  return source.toSource(options.printOptions);
}
