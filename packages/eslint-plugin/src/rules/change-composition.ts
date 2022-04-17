import type { Rule } from 'eslint';
import {
  identifier,
  importDeclaration,
  ImportDeclaration,
  ImportDefaultSpecifier,
  importSpecifier,
  JSXAttribute,
  jsxClosingElement,
  jsxElement,
  JSXElement,
  jsxExpressionContainer,
  jsxIdentifier,
  jsxOpeningElement,
  jsxText,
  whiteSpace,
} from 'eslint-codemod-utils';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Dummy rule that changes a component prop to a composed prop in a dummy component using ast-helpers',
      recommended: true,
    },
    fixable: 'code',
  },
  // @ts-expect-error
  create(context) {
    let importNode: ImportDeclaration | null = null;

    return {
      ImportDeclaration(node) {
        if (!node) return;

        if (node.source.value === '@atlaskit/modal-dialog') {
          importNode = node;
        }
      },
      JSXElement(node: JSXElement) {
        if (!importNode) {
          return;
        }

        const { openingElement } = node;

        if (openingElement.name.type !== 'JSXIdentifier') {
          return;
        }

        const localDefaultImport = importNode.specifiers.find(
          (spec): spec is ImportDefaultSpecifier =>
            spec.type === 'ImportDefaultSpecifier',
        );

        if (openingElement.name.name !== localDefaultImport?.local.name) {
          return;
        }

        // From here we're dealing with a JSX element of the right type
        const headingAttribute = openingElement.attributes.find(
          (attr): attr is JSXAttribute =>
            attr.type === 'JSXAttribute' && attr?.name?.name === 'heading',
        );

        if (!headingAttribute) {
          return;
        }

        context.report({
          // @ts-ignore
          node,
          message: 'error',
          fix(fixer) {
            const modalHeaderIdentifer = jsxIdentifier({ name: 'ModalHeader' });
            const fixed =
              '(\n' +
              ''.padStart(node.loc?.start?.column || 0, ' ') +
              String(
                jsxElement({
                  loc: node.loc,
                  openingElement: jsxOpeningElement({
                    ...node?.openingElement,
                    selfClosing: false,
                    attributes: node.openingElement.attributes.filter(
                      att =>
                        !(
                          att.type === 'JSXAttribute' &&
                          att.name.name === 'heading'
                        ),
                    ),
                  }),
                  closingElement: jsxClosingElement(
                    node?.closingElement || node.openingElement,
                  ),
                  children: (node.children || []).concat(
                    jsxElement({
                      // @ts-expect-error
                      loc: { start: { column: node.loc.start.column + 2 } },
                      openingElement: jsxOpeningElement({
                        name: modalHeaderIdentifer,
                        selfClosing: false,
                        attributes: [],
                      }),
                      closingElement: jsxClosingElement({
                        name: modalHeaderIdentifer,
                      }),
                      children: [
                        // JSXText case
                        headingAttribute?.value?.type === 'Literal' &&
                        typeof headingAttribute.value.value === 'string'
                          ? // @ts-ignore
                            jsxText(headingAttribute.value)
                          : headingAttribute?.value?.type === 'JSXElement'
                          ? jsxElement(headingAttribute.value)
                          : jsxExpressionContainer({
                              // @ts-expect-error TODO this shouldn't error
                              expression: headingAttribute.value!,
                            }),
                      ],
                    }),
                  ),
                }),
              ) +
              `\n${whiteSpace(node.loc!)})`;

            // @ts-expect-error
            const fixes = [fixer.replaceText(node, fixed)];

            // should never occurr
            if (!importNode) {
              return fixes;
            }

            if (
              !importNode.specifiers.some(
                spec =>
                  spec.type === 'ImportSpecifier' &&
                  spec.imported.name === 'ModalHeader',
              )
            ) {
              const namedImport = importSpecifier({
                local: identifier({ name: 'ModalHeader' }),
                imported: identifier({ name: 'ModalHeader' }),
              });
              fixes.push(
                fixer.replaceText(
                  importNode,
                  String(
                    importDeclaration({
                      ...importNode,
                      specifiers: (importNode.specifiers || []).concat(
                        namedImport,
                      ),
                    }),
                  ),
                ),
              );
              fixes.push(
                fixer.insertTextBefore(
                  importNode,
                  `// The import "ModalHeader" has been added by codemod\n`,
                ),
              );
            }

            return fixes;
          },
        });
      },
    };
  },
};

export default rule;
