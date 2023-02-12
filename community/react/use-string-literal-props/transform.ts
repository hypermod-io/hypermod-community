import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const withoutStringLiterals = j(file.source)
    .find(j.JSXAttribute)
    .filter(
      path =>
        path.value &&
        path.value.value &&
        // @ts-expect-error
        path.value.value.expression &&
        path.value.value.type === 'JSXExpressionContainer' &&
        path.value.value.expression.type === 'StringLiteral',
    )
    .forEach(path => {
      // @ts-expect-error
      path.value.value = j.stringLiteral(path.value.value.expression.value);
    })
    .toSource(options.printOptions);

  const withoutTemplateLiterals = j(withoutStringLiterals)
    .find(j.JSXAttribute)
    .filter((path: any) => {
      return (
        path.value &&
        path.value.value &&
        path.value.value.expression &&
        path.value.value.type === 'JSXExpressionContainer' &&
        path.value.value.expression &&
        path.value.value.expression.type === 'TemplateLiteral' &&
        path.value.value.expression.expressions &&
        path.value.value.expression.expressions.length === 0 &&
        path.value.value.expression.quasis &&
        path.value.value.expression.quasis[0] &&
        path.value.value.expression.quasis[0].value
      );
    })
    .forEach(path => {
      path.value.value = j.stringLiteral(
        // @ts-expect-error
        path.value.value.expression.quasis[0].value.raw,
      );
    })
    .toSource(options.printOptions);

  return withoutTemplateLiterals;
}
