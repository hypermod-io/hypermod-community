import { JSCodeshift, FunctionDeclaration, Collection } from 'jscodeshift';

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

      const params = component.node.params;

      const existingSingleProp = params.find(
        param => param.type === 'Identifier',
      );

      // Destructured params
      const destructuredProps = params.find(
        param => param.type === 'ObjectPattern',
      );

      const noExistingProps = params.length === 0;

      let newParams: FunctionDeclaration['params'] = [];

      if (noExistingProps) {
        newParams = [j.objectPattern(defaultParams)];
      } else if (existingSingleProp) {
        newParams = [
          j.objectPattern([
            // @ts-ignore
            j.spreadProperty(existingSingleProp),
            ...defaultParams,
          ]),
        ];
      } else {
        newParams = getNewDestructuredParams(
          destructuredProps,
          j,
          defaultParams,
        );
      }

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

function getNewDestructuredParams(
  existingPropsParam: FunctionDeclaration['params'][number] | undefined,
  j: JSCodeshift,
  defaultParams: any,
) {
  if (existingPropsParam && 'properties' in existingPropsParam) {
    const restProp = existingPropsParam.properties.find(
      // @ts-expect-error for some reason it does not exist
      prop => prop.type === 'RestElement',
    );

    const existingPropsDestructuredProps = existingPropsParam.properties
      .filter(prop => prop.type !== restProp?.type)
      .map(prop => j.property('init', (prop as any).key, (prop as any).value))
      .filter(Boolean);

    const restPropArg =
      restProp && 'argument' in restProp
        ? restProp.argument
        : j.identifier('rest');

    const newParams = [
      j.objectPattern([
        ...existingPropsDestructuredProps,
        ...defaultParams,
        // @ts-expect-error RestElement is not assignable as above
        ...(restProp ? [j.restProperty(restPropArg)] : []),
      ]),
    ];
    return newParams;
  }

  return [];
}
