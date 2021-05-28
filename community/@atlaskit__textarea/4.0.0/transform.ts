import { API, FileInfo, Options } from 'jscodeshift';
import {
  getDefaultImportSpecifierName,
  getJSXAttributesByName,
} from '@codeshift/utils';

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  const defaultSpecifier = getDefaultImportSpecifierName(
    j,
    source,
    '@atlaskit/textarea',
  );

  if (!defaultSpecifier) return fileInfo.source;

  source.findJSXElements(defaultSpecifier).forEach(element => {
    getJSXAttributesByName(j, element, 'forwardedRef').forEach(attribute => {
      j(attribute).replaceWith(
        j.jsxAttribute(j.jsxIdentifier('ref'), attribute.node.value),
      );
    });
  });

  return source.toSource(options.printOptions);
}
