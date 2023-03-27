import jscodeshift, { FileInfo } from 'jscodeshift';

type Parser = 'babel' | 'babylon' | 'flow' | 'ts' | 'tsx';

interface Options {
  parser?: Parser;
}

export default async function applyTransform(
  transform: any,
  input: string | FileInfo,
  options: Options = {
    parser: 'babel',
  },
) {
  // Handle ES6 modules using default export for the transform
  const transformer = transform.default ? transform.default : transform;

  const file = typeof input === 'string' ? { source: input } : input;

  const output = await transformer(
    file,
    {
      jscodeshift: jscodeshift.withParser(options.parser as string),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      stats: () => {},
    },
    options || {},
  );

  return (output || '').trim();
}
