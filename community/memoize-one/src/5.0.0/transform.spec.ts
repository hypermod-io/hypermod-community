import { applyTransform } from '@codeshift/test-utils';
import * as transformer from './transform';
import prettier from 'prettier';

function format(source: string): string {
  return prettier.format(source, { parser: 'typescript' }).trim();
}

describe('memoize-one@5.0.0 transform', () => {
  it('should not touch usages that do not use a custom equality function', () => {
    const result = applyTransform(
      transformer,
      format(`
        import memoize from 'memoize-one';

        function add(a: number, b: number) {
          return a + b;
        }

        const memoized = memoize(add);
      `),
      { parser: 'tsx' },
    );

    expect(result).toEqual(
      format(`
        import memoize from 'memoize-one';

        function add(a: number, b: number) {
          return a + b;
        }

        const memoized = memoize(add);
      `),
    );
  });
});
