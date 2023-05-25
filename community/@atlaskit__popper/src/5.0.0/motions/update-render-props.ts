import core, { ASTPath, JSXElement, Collection } from 'jscodeshift';

export default function updateRenderProps(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
  oldProperty: string,
  newProperty: string,
) {
  source.findJSXElements(specifier).forEach((element: ASTPath<JSXElement>) => {
    j(element)
      .find(j.ArrowFunctionExpression)
      .find(j.ObjectPattern)
      .find(j.ObjectProperty)
      .filter(
        // @ts-ignore
        (path: ASTPath<ObjectProperty>) => path.value.key.name === oldProperty,
      )
      .forEach(path => {
        j(path).replaceWith(
          j.property(
            'init',
            j.identifier(newProperty),
            j.identifier(oldProperty),
          ),
        );
      });
  });
}
