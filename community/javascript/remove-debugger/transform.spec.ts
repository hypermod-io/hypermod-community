import { applyTransform } from '@codeshift/test-utils';
import * as transformer from './transform';

describe('react@1.0.0 transform', () => {
  it('should not modify files with no debugger statements', () => {
    const result = applyTransform(transformer, `console.log('foooo');`, {
      parser: 'tsx',
    });

    expect(result).toMatchInlineSnapshot();
  });

  it('should remove top-level debugger statement', () => {
    const result = applyTransform(transformer, 'debugger;', { parser: 'tsx' });

    expect(result).toMatchInlineSnapshot();
  });

  it('should debuggers in function statements', () => {
    const result = applyTransform(
      transformer,
      `
      function foo () {
        debugger;
        setTimeout(() => { debugger; console.log('foo') });debugger;
      }
    `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot();
  });
});
