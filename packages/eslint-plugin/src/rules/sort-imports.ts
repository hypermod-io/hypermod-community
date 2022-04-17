import type { Rule } from 'eslint';
import { importDeclaration } from 'eslint-codemod-utils';

/**
 * Adapted for presentational / demo purposes only
 * @fileoverview Rule to require sorting of import declarations
 * @author Christian Schuller
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',

    docs: {
      description: 'enforce sorted import declarations within modules',
      recommended: false,
      url: 'https://eslint.org/docs/rules/sort-imports',
    },

    schema: [
      {
        type: 'object',
        properties: {
          ignoreCase: {
            type: 'boolean',
            default: false,
          },
          ignoreMemberSort: {
            type: 'boolean',
            default: false,
          },
        },
        additionalProperties: false,
      },
    ],

    fixable: 'code',
    messages: {
      sortMembersAlphabetically:
        "Member '{{memberName}}' of the import declaration should be sorted alphabetically.",
    },
  },

  create(context) {
    const configuration = context.options[0] || {},
      ignoreCase = configuration.ignoreCase || false,
      ignoreMemberSort = configuration.ignoreMemberSort || false;

    return {
      ImportDeclaration(node) {
        const specifiers = node.specifiers.map((spec, index) => {
          return {
            ...spec,
            index,
          };
        });

        const sorted = specifiers.sort((specA, specB) => {
          if (specA.type === 'ImportDefaultSpecifier') {
            return -1;
          }

          if (specB.type === 'ImportDefaultSpecifier') {
            return 1;
          }

          if (ignoreCase) {
            return specA.local.name
              .toLowerCase()
              .localeCompare(specB.local.name.toLowerCase());
          } else {
            return specA.local.name.localeCompare(specB.local.name);
          }
        });
        const unsortedNode = sorted.find((node, index) => {
          return index !== node.index;
        });

        if (!ignoreMemberSort && unsortedNode) {
          context.report({
            node: unsortedNode,
            messageId: 'sortMembersAlphabetically',
            data: {
              memberName: unsortedNode.local.name,
            },
            fix(fixer) {
              return fixer.replaceText(
                node,
                importDeclaration({
                  ...node,
                  specifiers: sorted,
                }).toString(),
              );
            },
          });
        }
      },
    };
  },
};

export default rule;
