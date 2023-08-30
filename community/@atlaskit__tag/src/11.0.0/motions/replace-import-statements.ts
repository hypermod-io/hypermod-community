import core from 'jscodeshift';
import { getImportDeclaration } from '@hypermod/utils';

const convertMap: Record<string, string> = {
  Tag: '@atlaskit/tag/removable-tag',
  SimpleTag: '@atlaskit/tag/simple-tag',
  TagColor: '@atlaskit/tag',
  default: '@atlaskit/tag/removable-tag',
  '*': '@atlaskit/tag/tag',
};

export const replaceImportStatement = (j: core.JSCodeshift, root: any) => {
  getImportDeclaration(j, root, '@atlaskit/tag').forEach(path => {
    const defaultSpecifier = (path.value.specifiers || []).filter(
      specifier => specifier.type === 'ImportDefaultSpecifier',
    );

    const defaultDeclarations = defaultSpecifier.map(s =>
      j.importDeclaration([s], j.literal(convertMap['default'])),
    );

    const otherSpecifier = (path.value.specifiers || []).filter(
      specifier => specifier.type === 'ImportSpecifier',
    );

    j(path).replaceWith(defaultDeclarations);

    const otherDeclarations = otherSpecifier.map(s => {
      const localName = s.local!.name;

      return j.importDeclaration(
        [s],
        j.literal(
          convertMap[localName] ? convertMap[localName] : convertMap['*'],
        ),
      );
    });

    j(path).insertAfter(otherDeclarations);
  });
};
