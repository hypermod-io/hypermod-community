import { ASTNode } from 'jscodeshift';

/**
 * The isNodeOfType function uses generics to check if a node of type ASTNode is of a specified type.
 * If the check passes, the type of node is narrowed to the expected type, ensuring that the returned type of the function is always correct.
 *
 * Example:
 *
 * ```ts
 * const isImportSpecifier = isNodeOfType(node, 'ImportSpecifier');
 * ```
 */
export const isNodeOfType = <Expected extends ASTNode>(
  node: ASTNode,
  type: Expected['type'],
): node is Expected => node.type === type;
