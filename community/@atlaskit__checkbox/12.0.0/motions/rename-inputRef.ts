import core, { Node, Collection } from 'jscodeshift';
import { getImportSpecifierName, getJSXAttributes } from '@codeshift/utils';

function hasVariableAssignment(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
  identifierName: string,
) {
  const occurrence = source.find(j.VariableDeclaration).filter(path => {
    return !!j(path.node)
      .find(j.VariableDeclarator)
      .find(j.Identifier)
      .filter(identifier => identifier.node.name === identifierName).length;
  });
  return !!occurrence.length ? occurrence : false;
}

function findIdentifierAndReplaceAttribute(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
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
    .forEach(element => {
      j(element)
        .find(j.JSXAttribute)
        .find(j.JSXIdentifier)
        .filter(attr => attr.node.name === searchAttr)
        .forEach(attribute => {
          j(attribute).replaceWith(j.jsxIdentifier(replaceWithAttr));
        });
    });
}

export const renameInputRef = (
  j: core.JSCodeshift,
  source: Collection<Node>,
) => {
  const specifier = getImportSpecifierName(
    j,
    source,
    'Checkbox',
    '@atlaskit/checkbox',
  );

  if (!specifier) return;

  source.findJSXElements(specifier).forEach(element => {
    getJSXAttributes(j, element, 'inputRef').forEach(attribute => {
      j(attribute).replaceWith(
        j.jsxAttribute(j.jsxIdentifier('ref'), attribute.node.value),
      );
    });
  });

  const variable = hasVariableAssignment(j, source, specifier);
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
            'inputRef',
            'ref',
          );
        });
    });
  }
};
