import { FileInfo, API, Collection, JSCodeshift } from 'jscodeshift';
import { moveDefaultPropsToFunctionDeclaration } from './motions/moveDefaultPropsToFunctionDeclaration';
import { removeDefaultPropsAssignment } from './motions/removeDefaultPropsAssignment';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const source = j(file.source);

  // Find all function declarations with name "Component"
  moveDefaultPropsToFunctionDeclaration(source, j);
  arrowFunctions(source, j);

  removeDefaultPropsAssignment(source, j);

  return source.toSource();
}

export function arrowFunctions(source: Collection<any>, j: JSCodeshift) {
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

    const newParams = [j.objectPattern(defaultParams)];

    j(component).replaceWith(
      j.variableDeclarator(
        // @ts-ignore
        j.identifier(component.node.id.name),
        j.arrowFunctionExpression([...newParams], j.blockStatement([])),
      ),
    );
  });
}
