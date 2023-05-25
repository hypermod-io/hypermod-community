import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  return j(file.source)
    .find(j.Identifier)
    .forEach(path => {
      if (path.node.name === 'unstable_handleError') {
        j(path).replaceWith(j.identifier('componentDidCatch'));
      }
    })
    .toSource(options.printOptions);
}
