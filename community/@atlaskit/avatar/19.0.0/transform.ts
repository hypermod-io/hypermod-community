import core, {
  API,
  ASTPath,
  FileInfo,
  ImportDeclaration,
  ImportSpecifier,
  Options,
} from 'jscodeshift';

function getDefaultSpecifier(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
  specifier: string,
) {
  const specifiers = source
    .find(j.ImportDeclaration)
    .filter(
      (path: ASTPath<ImportDeclaration>) =>
        path.node.source.value === specifier,
    )
    .find(j.ImportDefaultSpecifier);

  if (!specifiers.length) {
    return null;
  }
  return specifiers.nodes()[0]!.local!.name;
}

function getImportSpecifier(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
  specifier: string,
  imported: string,
) {
  const specifiers = source
    .find(j.ImportDeclaration)
    .filter(
      (path: ASTPath<ImportDeclaration>) =>
        path.node.source.value === specifier,
    )
    .find(j.ImportSpecifier)
    .filter(
      (path: ASTPath<ImportSpecifier>) => path.value.imported.name === imported,
    );

  if (!specifiers.length) {
    return null;
  }

  return specifiers.nodes()[0]!.local!.name;
}

function getJSXAttributesByName(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  attributeName: string,
) {
  return j(element)
    .find(j.JSXOpeningElement)
    .find(j.JSXAttribute)
    .filter(attribute => {
      const matches = j(attribute)
        .find(j.JSXIdentifier)
        .filter(identifier => identifier.value.name === attributeName);
      return Boolean(matches.length);
    });
}

function wrapChildrenProp(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
  specifier: string,
) {
  source.findJSXElements(specifier).forEach(element => {
    const componentProp = getJSXAttributesByName(j, element, 'component').get();
    const componentName = j(componentProp)
      .find(j.JSXExpressionContainer)
      .find(j.Expression)
      .get().value.name;

    const customComponent = j.jsxElement(
      j.jsxOpeningElement(
        j.jsxIdentifier(componentName),
        [j.jsxSpreadAttribute(j.identifier('props'))],
        true,
      ),
    );

    const childrenExpression = j.jsxExpressionContainer(
      j.arrowFunctionExpression(
        [
          j.objectPattern([
            j.objectProperty(j.identifier('ref'), j.identifier('_')),
            j.restProperty(j.identifier('props')),
          ]),
        ],
        customComponent,
      ),
    );

    j(componentProp).remove();
    j(element).replaceWith(
      j.jsxElement(
        j.jsxOpeningElement(
          element.value.openingElement.name,
          element.value.openingElement.attributes,
          false,
        ),
        j.jsxClosingElement(element.value.openingElement.name),
        [childrenExpression],
      ),
    );
  });
}

function hasImportDeclaration(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
  importPath: string,
) {
  return !!source
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === importPath).length;
}

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  if (hasImportDeclaration(j, source, '@atlaskit/avatar')) {
    const defaultSpecifier = getDefaultSpecifier(j, source, '@atlaskit/avatar');

    if (defaultSpecifier != null) {
      wrapChildrenProp(j, source, defaultSpecifier);
    }

    const importSpecifier = getImportSpecifier(
      j,
      source,
      '@atlaskit/avatar',
      'AvatarItem',
    );

    if (importSpecifier != null) {
      wrapChildrenProp(j, source, importSpecifier);
    }

    return source.toSource(options.printOptions || { quote: 'single' });
  }

  return fileInfo.source;
}
