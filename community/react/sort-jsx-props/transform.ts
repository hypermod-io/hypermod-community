import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const isSpreadElement = (prop: any) =>
    prop && prop.type === 'JSXSpreadAttribute';
  const isValue = (prop: any) => prop && prop.type !== 'JSXSpreadAttribute';
  const getPropName = (jsxAttribute: any) =>
    jsxAttribute.name ? jsxAttribute.name.name : '...spread';
  const sortByPropName = (a: string, b: string) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  const sortProps = (props: any) => {
    props.sort((a: any, b: any) =>
      sortByPropName(getPropName(a), getPropName(b)),
    );
  };

  return j(file.source)
    .find(j.JSXOpeningElement)
    .forEach(path => {
      const chunks: any[] = [];
      const nextAttributes: any[] = [];
      const jSXOpeningElement = path.value;

      jSXOpeningElement.attributes!.forEach((prop, i, props) => {
        if (isValue(prop)) {
          const prev = props[i - 1];
          const next = props[i + 1];
          const isChunkStart = !isValue(prev);
          const isChunkEnd = !isValue(next);

          isChunkStart && chunks.push([]);
          const [chunk] = chunks.slice(-1);
          chunk.push(prop);

          if (isChunkEnd) {
            sortProps(chunk);
            nextAttributes.push(...chunk);
          }
        } else if (isSpreadElement(prop)) {
          nextAttributes.push(prop);
        }
      });

      jSXOpeningElement.attributes = nextAttributes;
    })
    .toSource(options.printOptions);
}
