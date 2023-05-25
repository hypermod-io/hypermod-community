import core, { ASTPath, Collection, Identifier } from 'jscodeshift';
import {
  getImportDeclaration,
  getDefaultImportSpecifierName,
} from '@codeshift/utils';

function getSafeImportName(
  j: core.JSCodeshift,
  base: Collection<any>,
  currentDefaultSpecifierName: string,
  desiredName: string,
  fallbackName: string,
) {
  if (currentDefaultSpecifierName === desiredName) {
    return desiredName;
  }

  const isUsed =
    base
      .find(j.Identifier)
      .filter(
        (identifer: ASTPath<Identifier>) =>
          identifer.value.name === desiredName,
      ).length > 0;

  return isUsed ? fallbackName : desiredName;
}

const renameToggleStateless = (j: core.JSCodeshift, source: any) => {
  const component = '@atlaskit/toggle';
  const from = 'ToggleStateless';
  const to = 'Toggle';
  const fallback = 'DSToggle';

  const defaultSpecifier = getDefaultImportSpecifierName(j, source, component);

  const toName = fallback
    ? getSafeImportName(j, source, defaultSpecifier!, to, fallback)
    : to;

  getImportDeclaration(j, source, component).forEach(path => {
    j(path).replaceWith(
      j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier(toName))],
        j.literal(component),
      ),
    );
  });

  source
    .find(j.JSXElement)
    .find(j.JSXOpeningElement)
    .forEach(
      (path: ASTPath<any>) =>
        !!j(path.node)
          .find(j.JSXIdentifier)
          .filter(identifier => identifier.value.name === from)
          .forEach(element => {
            j(element).replaceWith(j.jsxIdentifier(toName));
          }),
    );
};

export default renameToggleStateless;
