import {
  API,
  FileInfo,
  Options,
  ObjectExpression,
  ObjectMethod,
  ObjectProperty,
  Property,
  SpreadElement,
  SpreadProperty,
} from 'jscodeshift';

const isSpreadElement = (
  prop:
    | ObjectMethod
    | ObjectProperty
    | Property
    | SpreadElement
    | SpreadProperty,
): prop is SpreadElement => prop && prop.type === 'SpreadElement';

const isValue = (
  prop:
    | ObjectMethod
    | ObjectProperty
    | Property
    | SpreadElement
    | SpreadProperty,
): prop is ObjectMethod | ObjectProperty | Property | SpreadProperty =>
  prop && prop.type !== 'SpreadElement';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const getPropName = (prop: any) =>
    (prop.key && (prop.key.name || prop.key.value)) || '';
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
    .find(j.ObjectExpression)
    .forEach(path => {
      const chunks: any[] = [];
      const nextProperties: SpreadElement[] = [];
      const objectExpression: ObjectExpression = path.value;

      objectExpression.properties.forEach((prop, i, props) => {
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
            nextProperties.push(...chunk);
          }
        }

        if (isSpreadElement(prop)) {
          nextProperties.push(prop);
        }
      });

      objectExpression.properties = nextProperties;
    })
    .toSource(options.printOptions);
}
