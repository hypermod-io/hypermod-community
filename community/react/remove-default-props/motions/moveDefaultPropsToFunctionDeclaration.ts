import { JSCodeshift } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';

export function moveDefaultPropsToFunctionDeclaration(
  source: Collection<any>,
  j: JSCodeshift,
) {
  source
    .find(j.FunctionDeclaration, {
      id: { name: 'Component' },
    })
    .forEach(component => {
      // Find the defaultProps assignment expression
      const defaultProps = source.find(j.AssignmentExpression, {
        left: {
          object: { name: 'Component' },
          property: { name: 'defaultProps' },
        },
      });

      if (defaultProps.length === 0) return;

      // Extract the default props object
      const defaultValues = defaultProps.get('right').value.properties;

      // Generate a new function parameter for each default prop
      const params = defaultValues.map((prop: any) => {
        const key = prop.key.name;
        const value = prop.value.value;
        // return j.objectPattern(`${key}=${JSON.stringify(value)}`);
        return j.objectPattern([
          j.objectProperty(
            j.identifier(key),
            j.assignmentPattern(j.identifier(key), j.literal(value)),
          ),
        ]);
      });

      // Replace the original function declaration with a new one
      j(component).replaceWith(nodePath =>
        j.functionDeclaration(
          nodePath.node.id,
          params,
          nodePath.node.body,
          nodePath.node.generator,
          nodePath.node.async,
        ),
      );
      // Remove the
    })
    .find(j.AssignmentExpression, {
      left: {
        object: { name: 'Component' },
        property: { name: 'defaultProps' },
      },
    })
    .toSource();
}
