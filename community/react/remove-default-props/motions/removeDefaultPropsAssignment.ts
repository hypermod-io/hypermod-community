import { JSCodeshift } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';

export function removeDefaultPropsAssignment(
  j: JSCodeshift,
  source: Collection<any>,
) {
  const removePath = (path: any) => j(path).remove();
  const isAssigningDefaultProps = (e: any) =>
    e.node.left &&
    e.node.left.property &&
    e.node.left.property.name === 'defaultProps';

  return source
    .find(j.AssignmentExpression)
    .filter(isAssigningDefaultProps)
    .forEach(removePath);
}
