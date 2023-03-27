import { Collection, JSCodeshift } from 'jscodeshift';
import { getNewParams } from './getNewParams';

export function moveDefaultPropsToArrowFunctionExpression(
  j: JSCodeshift,
  source: Collection<any>,
) {
  source.find(j.VariableDeclarator).forEach(component => {
    const defaultProps = source.find(j.AssignmentExpression, {
      left: {
        // @ts-ignore
        object: { name: component.node.id?.name },
        property: { name: 'defaultProps' },
      },
    });

    const defaultValues = defaultProps.get('right').value.properties;

    if (defaultProps.length === 0) return;

    // Generate a new function parameter for each default prop
    const defaultParams = defaultValues.map((prop: any) => {
      const key = prop.key.name;
      const value = prop.value.value;
      return j.objectProperty(
        j.identifier(key),
        j.assignmentPattern(j.identifier(key), j.literal(value)),
      );
    });

    const arrowFunction = component.get('init');

    const newParams = getNewParams(j, arrowFunction, defaultParams);

    j(component).replaceWith(
      j.variableDeclarator(
        // @ts-ignore
        j.identifier(component.node.id.name),
        j.arrowFunctionExpression(newParams!, j.blockStatement([])),
      ),
    );
  });
}
