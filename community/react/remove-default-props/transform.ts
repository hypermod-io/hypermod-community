import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const removePath = path => j(path).remove();
  const isAssigningDefaultProps = e =>
    e.node.left &&
    e.node.left.property &&
    e.node.left.property.name === 'defaultProps';

  return j(file.source)
    .find(j.AssignmentExpression)
    .filter(isAssigningDefaultProps)
    .forEach(removePath)
    .toSource(options.printOptions);
}
