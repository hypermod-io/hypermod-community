import {
  JSCodeshift,
  FunctionDeclaration,
  ASTPath,
  ArrowFunctionExpression,
} from 'jscodeshift';

export function getNewParams(
  j: JSCodeshift,
  component: ASTPath<FunctionDeclaration | ArrowFunctionExpression>,
  defaultParams: any,
) {
  const params = component.node.params;

  const existingSingleProp = params.find(param => param.type === 'Identifier');

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
    newParams = getNewDestructuredParams(destructuredProps, j, defaultParams);
  }
  return newParams;
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
