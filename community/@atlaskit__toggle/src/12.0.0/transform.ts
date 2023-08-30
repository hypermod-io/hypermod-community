import { API, FileInfo, Options } from 'jscodeshift';
import { hasImportDeclaration } from '@hypermod/utils';

import elevateStateless from './motions/elevate-stateless';
import renameToggleStateless from './motions/rename-togglestateless';

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  if (!hasImportDeclaration(j, source, '@atlaskit/toggle')) {
    return fileInfo.source;
  }

  elevateStateless(j, source);
  renameToggleStateless(j, source);

  return source.toSource(options.printOptions);
}
