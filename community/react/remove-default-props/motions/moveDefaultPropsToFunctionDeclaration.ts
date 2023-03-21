import { JSCodeshift } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';

export function moveDefaultPropsToFunctionDeclaration(
  source: Collection<any>,
  j: JSCodeshift,
) {
  source
    .find(j.FunctionDeclaration)
    .forEach(component => {
      // Find the defaultProps assignment expression
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

      // Find the existing destructured props parameter, if any
      const existingPropsParam = component.node.params.find(
        param => param.type === 'ObjectPattern',
      );

      // If an existing props parameter was found, extract its properties
      const existingPropsProperties =
        existingPropsParam && 'properties' in existingPropsParam
          ? existingPropsParam.properties.map(prop =>
              j.property('init', (prop as any).key, (prop as any).value),
            )
          : [];

      // Generate the new params array by concatenating the existing props properties with the default params
      const newParams = [
        j.objectPattern(existingPropsProperties.concat(defaultParams)),
      ];

      // Replace the original function declaration with a new one
      j(component).replaceWith(nodePath =>
        j.functionDeclaration(
          nodePath.node.id,
          newParams,
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
