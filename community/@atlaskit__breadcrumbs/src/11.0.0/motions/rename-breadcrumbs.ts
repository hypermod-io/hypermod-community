import core, {
  ASTPath,
  ImportDeclaration,
  Collection,
  Identifier,
} from 'jscodeshift';
import { getDefaultImportSpecifierName } from '@hypermod/utils';

function doesIdentifierExist(
  j: core.JSCodeshift,
  base: Collection<any>,
  name: string,
) {
  return (
    base
      .find(j.Identifier)
      .filter((identifer: ASTPath<Identifier>) => identifer.value.name === name)
      .length > 0
  );
}

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

  return doesIdentifierExist(j, base, desiredName) ? fallbackName : desiredName;
}

const createRenameJSXFunc =
  (
    component: string,
    from: string,
    to: string,
    fallback: string | undefined = undefined,
  ) =>
  (j: core.JSCodeshift, source: any) => {
    const defaultSpecifier = getDefaultImportSpecifierName(
      j,
      source,
      component,
    );

    const toName = fallback
      ? getSafeImportName(j, source, defaultSpecifier!, to, fallback)
      : to;

    source
      .find(j.ImportDeclaration)
      .filter(
        (path: ASTPath<ImportDeclaration>) =>
          path.node.source.value === component,
      )
      .find(j.ImportDefaultSpecifier)
      .find(j.Identifier)
      .filter((p: ASTPath<Identifier>) => (p.value && p.value.name) === from)
      .forEach((path: ASTPath<ImportDeclaration>) => {
        j(path).replaceWith(j.importDefaultSpecifier(j.identifier(toName)));
      });

    source.find(j.JSXElement).forEach((path: ASTPath<any>) => {
      return !!j(path.node)
        .find(j.JSXIdentifier)
        .filter(identifier => identifier.value.name === from)
        .forEach(element => {
          j(element).replaceWith(j.jsxIdentifier(toName));
        });
    });
  };

const renameBreadcrumbs = createRenameJSXFunc(
  '@atlaskit/breadcrumbs',
  'BreadcrumbsStateless',
  'Breadcrumbs',
  'DSBreadcrumbs',
);

export default renameBreadcrumbs;
