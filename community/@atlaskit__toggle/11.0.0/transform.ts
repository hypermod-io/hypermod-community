import core, { API, Collection, FileInfo, Options } from 'jscodeshift';
import {
  getDefaultImportSpecifierName,
  hasImportDeclaration,
  getJSXAttributesByName,
} from '@codeshift/utils';

function findIdentifierAndReplaceAttribute(
  j: core.JSCodeshift,
  source: Collection<any>,
  identifierName: string,
  searchAttr: string,
  replaceWithAttr: string,
) {
  source
    .find(j.JSXElement)
    .find(j.JSXOpeningElement)
    .filter(path => {
      return !!j(path.node)
        .find(j.JSXIdentifier)
        .filter(identifier => identifier.value.name === identifierName);
    })
    .find(j.JSXAttribute)
    .find(j.JSXIdentifier)
    .filter(attr => attr.node.name === searchAttr)
    .replaceWith(j.jsxIdentifier(replaceWithAttr));
}

function hasVariableAssignment(
  j: core.JSCodeshift,
  source: Collection<any>,
  identifierName: string,
) {
  const occurrence = source.find(j.VariableDeclaration).filter(
    path =>
      !!j(path.node)
        .find(j.VariableDeclarator)
        .find(j.Identifier)
        .filter(identifier => identifier.node.name === identifierName).length,
  );
  return !!occurrence.length ? occurrence : false;
}

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  /**
   * Early exit condition
   * -----
   * It is often good practice to exit early and return the original source file
   * if it does not contain code relevant to the codemod.
   * See this page for more information:
   * https://codeshiftcommunity.github.io/CodeshiftCommunity/docs/your-first-codemod#output
   */
  if (!hasImportDeclaration(j, source, '@atlaskit/toggle')) {
    return fileInfo.source;
  }

  const defaultSpecifier = getDefaultImportSpecifierName(
    j,
    source,
    '@atlaskit/toggle',
  );

  if (!defaultSpecifier) return fileInfo.source;

  source.findJSXElements(defaultSpecifier).forEach(element => {
    getJSXAttributesByName(j, element, 'isDefaultChecked').forEach(
      attribute => {
        j(attribute).replaceWith(
          j.jsxAttribute(
            j.jsxIdentifier('defaultChecked'),
            attribute.node.value,
          ),
        );
      },
    );
  });

  const variable = hasVariableAssignment(j, source, defaultSpecifier);

  if (variable) {
    variable.find(j.VariableDeclarator).forEach(declarator => {
      j(declarator)
        .find(j.Identifier)
        .filter(identifier => identifier.name === 'id')
        .forEach(ids => {
          findIdentifierAndReplaceAttribute(
            j,
            source,
            ids.node.name,
            'isDefaultChecked',
            'defaultChecked',
          );
        });
    });
  }

  return source.toSource(options.printOptions);
}
