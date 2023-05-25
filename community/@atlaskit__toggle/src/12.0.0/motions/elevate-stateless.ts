import core from 'jscodeshift';
import { getImportDeclaration } from '@codeshift/utils';

const elevateStateless = (j: core.JSCodeshift, root: any) => {
  getImportDeclaration(j, root, '@atlaskit/toggle').forEach(path => {
    const defaultSpecifier = (path.value.specifiers || []).filter(
      specifier => specifier.type === 'ImportDefaultSpecifier',
    );

    const otherSpecifier = (path.value.specifiers || []).filter(
      specifier => specifier.type === 'ImportSpecifier',
    );

    if (defaultSpecifier.length > 0 || otherSpecifier.length > 1) return;

    const declaration = otherSpecifier.map(s =>
      j.importDeclaration(
        [j.importDefaultSpecifier(s.local)],
        j.literal('@atlaskit/toggle'),
      ),
    );

    j(path).replaceWith(declaration);
  });
};

export default elevateStateless;
