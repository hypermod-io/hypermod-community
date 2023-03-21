import { JSCodeshift } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';

export function removeDefaultPropsAssignment(
  source: Collection<any>,
  j: JSCodeshift,
) {
  source
    .find(j.AssignmentExpression, {
      left: {
        object: { name: 'Component' },
        property: { name: 'defaultProps' },
      },
    })
    .remove();
}
