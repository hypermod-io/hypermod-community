import core, {
  ASTPath,
  ImportDeclaration,
  JSXAttribute,
  JSXElement,
  JSXExpressionContainer,
  VariableDeclaration,
  Node,
  Collection,
} from 'jscodeshift';

import {
  insertCommentBefore,
  getDefaultImportSpecifierName,
  getJSXAttributes,
} from '@codeshift/utils';

import {
  ACTIONS_PROP_NAME,
  LINK_COMPONENT_PROP_NAME,
  SECTION_MESSAGE_ACTION_COMPONENT_NAME,
  SECTION_MESSAGE_ACTION_PACKAGE_NAME,
  SECTION_MESSAGE_PACKAGE_NAME,
} from '../constants';

import { getDynamicImportName } from '../utils';

function doesIdentifierExist(
  j: core.JSCodeshift,
  base: Collection<any>,
  name: string,
) {
  return (
    base.find(j.Identifier).filter(identifer => identifer.value.name === name)
      .length > 0
  );
}

const addSectionMessageActionImportSpecifier = (
  j: core.JSCodeshift,
  source: Collection<Node>,
  name: string,
) => {
  source
    .find(j.ImportDeclaration)
    .filter(
      (path: ASTPath<ImportDeclaration>) =>
        path.node.source.value === SECTION_MESSAGE_PACKAGE_NAME,
    )
    .forEach((path: ASTPath<ImportDeclaration>) => {
      path.value.specifiers?.push(
        j.importSpecifier(
          j.identifier(SECTION_MESSAGE_ACTION_COMPONENT_NAME),
          j.identifier(name),
        ),
      );
    });
};

const addSectionMessageActionDynamicImport = (
  j: core.JSCodeshift,
  target: Collection<VariableDeclaration>,
  name: string,
) => {
  const node = j.variableDeclaration('const', [
    j.variableDeclarator(
      j.identifier(name),
      j.callExpression(
        j.memberExpression(j.identifier('React'), j.identifier('lazy')),
        [
          j.arrowFunctionExpression(
            [],
            j.callExpression(j.import(), [
              j.stringLiteral(SECTION_MESSAGE_ACTION_PACKAGE_NAME),
            ]),
          ),
        ],
      ),
    ),
  ]);

  target.insertAfter(node);
  insertCommentBefore(
    j,
    j(node),
    'We have added `React.lazy` here. Feel free to change it to `lazy` or other named import depending upon how you imported.',
  );
};

const transferLinkComponentProp = (
  j: core.JSCodeshift,
  element: ASTPath<JSXElement>,
) => {
  const linkComponentAttributeCollection: Collection<JSXAttribute> =
    getJSXAttributes(j, element, LINK_COMPONENT_PROP_NAME);
  const linkComponentAttribute =
    linkComponentAttributeCollection.length === 1
      ? linkComponentAttributeCollection.paths()[0]
      : null;

  const linkComponentAttributeValue = linkComponentAttribute?.node?.value;

  if (linkComponentAttribute) {
    j(linkComponentAttribute).remove();
  }

  return linkComponentAttributeValue;
};

const mapActionsProp = (j: core.JSCodeshift, source: Collection<Node>) => {
  const defaultSpecifierName =
    getDefaultImportSpecifierName(j, source, SECTION_MESSAGE_PACKAGE_NAME) ??
    '';

  const dynamicImportName =
    getDynamicImportName(j, source, SECTION_MESSAGE_PACKAGE_NAME) ?? '';

  if (!defaultSpecifierName && !dynamicImportName) {
    return;
  }

  const actionName = doesIdentifierExist(
    j,
    source,
    SECTION_MESSAGE_ACTION_COMPONENT_NAME,
  )
    ? `Atlaskit${SECTION_MESSAGE_ACTION_COMPONENT_NAME}`
    : SECTION_MESSAGE_ACTION_COMPONENT_NAME;

  let actionsAttributes = [];

  source
    .findJSXElements(defaultSpecifierName || dynamicImportName)
    .forEach(element => {
      const linkComponentAttributeValue = transferLinkComponentProp(j, element);
      // @ts-ignore
      actionsAttributes = getJSXAttributes(j, element, ACTIONS_PROP_NAME);

      actionsAttributes.forEach((attribute: ASTPath<JSXAttribute>) => {
        j(attribute)
          .find(j.JSXExpressionContainer)
          .forEach((expressionContainer: ASTPath<JSXExpressionContainer>) => {
            const { expression } = expressionContainer.node;

            if (expression.type === 'JSXEmptyExpression') {
              return;
            }

            const textObjectProperty = j.objectProperty(
              j.identifier('text'),
              j.identifier('text'),
            );

            textObjectProperty.shorthand = true;

            j(expressionContainer).replaceWith(
              j.jsxExpressionContainer(
                j.callExpression(
                  j.memberExpression(expression, j.identifier('map')),
                  [
                    j.arrowFunctionExpression(
                      [
                        j.objectPattern([
                          textObjectProperty,
                          j.restProperty(j.identifier('restAction')),
                        ]),
                      ],
                      j.jsxElement(
                        j.jsxOpeningElement(
                          j.jsxIdentifier(actionName),
                          [
                            linkComponentAttributeValue
                              ? j.jsxAttribute(
                                  j.jsxIdentifier(LINK_COMPONENT_PROP_NAME),
                                  linkComponentAttributeValue,
                                )
                              : null,
                            j.jsxSpreadAttribute(j.identifier('restAction')),
                          ].filter(Boolean) as JSXAttribute[],
                        ),
                        j.jsxClosingElement(j.jsxIdentifier(actionName)),
                        [j.jsxExpressionContainer(j.identifier('text'))],
                      ),
                    ),
                  ],
                ),
              ),
            );
          });
      });
    });

  if (actionsAttributes.length > 0 && defaultSpecifierName) {
    addSectionMessageActionImportSpecifier(j, source, actionName);
  }

  if (actionsAttributes.length > 0 && dynamicImportName) {
    addSectionMessageActionDynamicImport(
      j,
      source.find(j.VariableDeclaration).filter(variableDeclarationPath => {
        return (
          j(variableDeclarationPath)
            .find(j.VariableDeclarator)
            .filter(
              variableDeclaratorPath =>
                variableDeclaratorPath.node.id.type === 'Identifier' &&
                variableDeclaratorPath.node.id.name === dynamicImportName,
            ).length > 0
        );
      }),
      actionName,
    );
  }
};

export default mapActionsProp;
