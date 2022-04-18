import core, { ASTPath, ImportDeclaration, ImportSpecifier } from 'jscodeshift';

type Nullable<T> = T | null;

const elevateComponentToDefault =
  (pkg: string, innerElementName: string) =>
  (j: core.JSCodeshift, root: any) => {
    const existingAlias: Nullable<string> =
      root
        .find(j.ImportDeclaration)
        .filter(
          (path: ASTPath<ImportDeclaration>) => path.node.source.value === pkg,
        )
        .find(j.ImportSpecifier)
        .nodes()
        .map((specifier: ImportSpecifier): Nullable<string> => {
          if (innerElementName !== specifier.imported.name) {
            return null;
          }
          // If aliased: return the alias
          if (specifier.local && innerElementName !== specifier.local.name) {
            return specifier.local.name;
          }

          return null;
        })
        .filter(Boolean)[0] || null;

    root
      .find(j.ImportDeclaration)
      .filter(
        (path: ASTPath<ImportDeclaration>) => path.node.source.value === pkg,
      )
      .forEach((path: ASTPath<ImportDeclaration>) => {
        const defaultSpecifier = (path.value.specifiers || []).filter(
          specifier => specifier.type === 'ImportDefaultSpecifier',
        );

        const otherSpecifier = (path.value.specifiers || []).filter(
          specifier => specifier.type === 'ImportSpecifier',
        );

        if (defaultSpecifier.length > 0) {
          return;
        }

        const ds = otherSpecifier.find(s =>
          [innerElementName, existingAlias].includes(s.local?.name || null),
        );
        const ni = otherSpecifier.filter(
          s =>
            ![innerElementName, existingAlias].includes(s.local?.name || null),
        );
        const declaration = j.importDeclaration(
          [j.importDefaultSpecifier(ds && ds.local), ...ni],
          j.literal(pkg),
        );

        j(path).replaceWith(declaration);
      });
  };

const elevateStatelessToDefault = elevateComponentToDefault(
  '@atlaskit/breadcrumbs',
  'BreadcrumbsStateless',
);

export default elevateStatelessToDefault;
