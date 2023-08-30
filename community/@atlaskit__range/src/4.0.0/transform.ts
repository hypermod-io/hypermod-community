import { API, FileInfo, Options } from 'jscodeshift';
import {
  getDefaultImportSpecifierName,
  getJSXAttributes,
} from '@hypermod/utils';

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  const defaultSpecifier = getDefaultImportSpecifierName(
    j,
    source,
    '@atlaskit/range',
  );

  if (!defaultSpecifier) return fileInfo.source;

  source.findJSXElements(defaultSpecifier).forEach(element => {
    getJSXAttributes(j, element, 'inputRef').forEach(attribute => {
      j(attribute).replaceWith(
        j.jsxAttribute(j.jsxIdentifier('ref'), attribute.node.value),
      );
    });
  });

  return source.toSource(options.printOptions);
}
