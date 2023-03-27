import { JSCodeshift, Collection } from 'jscodeshift';
import { getNewParams } from './getNewParams';

export function moveDefaultPropsToFunctionDeclaration(
  j: JSCodeshift,
  source: Collection<any>,
) {
  source
    .find(j.FunctionDeclaration)
    .forEach(component => {
      const defaultProps = source.find(j.AssignmentExpression, {
        left: {
          object: { name: component.node.id?.name },
          property: { name: 'defaultProps' },
        },
      });

      if (defaultProps.length === 0) return;

      // Extract the default props object
      const defaultValues = defaultProps.get('right').value.properties;

      // Generate a new function parameter for each default prop
      const defaultParams = defaultValues.map((prop: any) => {
        const key = prop.key.name;
        const value = prop.value.value;
        // return j.objectPattern(`${key}=${JSON.stringify(value)}`);
        return j.objectProperty(
          j.identifier(key),
          j.assignmentPattern(j.identifier(key), j.literal(value)),
        );
      });
      // Find the defaultProps assignment expression
      const newParams = getNewParams(j, component, defaultParams);
      // Replace the original function declaration with a new one
      j(component).replaceWith(nodePath =>
        j.functionDeclaration(
          nodePath.node.id,
          newParams!,
          nodePath.node.body,
          nodePath.node.generator,
          nodePath.node.async,
        ),
      );
    })
    .find(j.AssignmentExpression, {
      left: {
        object: { type: 'Identifier' },
        property: { name: 'defaultProps' },
      },
    })
    .toSource();
}
