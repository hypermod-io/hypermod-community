import { API, FileInfo, Options } from 'jscodeshift';
import {
  hasImportDeclaration,
  renameImportDeclaration,
} from '@codeshift/utils';

const importMap = {
  '@emotion/core': '@emotion/react',
  emotion: '@emotion/css',
  'emotion-theming': '@emotion/react',
  'emotion-server': '@emotion/server',
  'create-emotion': '@emotion/css/create-instance',
  'create-emotion-server': '@emotion/server/create-instance',
  'babel-plugin-emotion': '@emotion/babel-plugin',
  'eslint-plugin-emotion': '@emotion/eslint-plugin',
  'jest-emotion': '@emotion/jest',
};

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(file.source);

  if (
    !Object.keys(importMap).some(importSource =>
      hasImportDeclaration(j, source, importSource),
    )
  ) {
    return file.source;
  }

  Object.entries(importMap).forEach(([key, value]) =>
    renameImportDeclaration(j, source, key, value),
  );

  return source.toSource(options.printOptions);
}
