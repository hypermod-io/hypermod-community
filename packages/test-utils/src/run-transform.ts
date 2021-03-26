import jscodeshift from 'jscodeshift';

type Parser = 'babel' | 'babylon' | 'flow' | 'ts' | 'tsx';

interface Options {
  parser?: Parser;
}

export default function runTransform(
  transform: any,
  input: string,
  options: Options = {
    parser: 'babel',
  },
) {
  // Handle ES6 modules using default export for the transform
  const transformer = transform.default ? transform.default : transform;
  const output = transformer(
    { source: input },
    {
      jscodeshift: jscodeshift.withParser(options.parser as string),
      stats: () => {},
    },
    options || {},
  );

  return (output || '').trim();
}
