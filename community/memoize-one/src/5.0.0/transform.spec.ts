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

  it.only('should wrap inline equality functions', () => {
    const result = applyTransform(
      transformer,
      format(`
        import memoize from 'memoize-one';

        function add(a: number, b: number) {
          return a + b;
        }

        const memoized = memoize(add, function isEqual(a, b) {
          return a === b;
        });
      `),
      { parser: 'tsx' },
    );

    expect(result).toEqual(
      format(`
      import memoize from 'memoize-one';

      function add(a: number, b: number) {
        return a + b;
      }

      const memoized = memoize(add, (newArgs, lastArgs) => {
        if (newArgs.length !== lastArgs.length) {
          return false;
        }

        function isEqual(a, b) {
          return a === b;
        }

        return newArgs.every((newArg, index) => isEqual(newArg, lastArgs[index]));
      });
      `),
    );
  });

  it('should wrap references', () => {
    const result = applyTransform(
      transformer,
      format(`
        import memoize from 'memoize-one';

        function isEqual(a, b) {
          return a === b;
        }

        function add(a: number, b: number) {
          return a + b;
        }

        const memoized = memoize(add, isEqual);
      `),
      { parser: 'tsx' },
    );

    expect(result).toEqual(
      format(`
        import memoize from "memoize-one";

        function isEqual(a, b) {
          return a === b;
        }

        function add(a: number, b: number) {
          return a + b;
        }

        const memoized = memoize(add, (newArgs, lastArgs) => {
          if (newArgs.length !== lastArgs.length) {
            return false;
          }

          return newArgs.every((newArg, index) => isEqual(newArg, lastArgs[index]));
        });
      `),
    );
  });
});
