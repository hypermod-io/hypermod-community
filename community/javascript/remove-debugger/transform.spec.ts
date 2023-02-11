import { applyTransform } from '@codeshift/test-utils';
import * as transformer from './transform';

describe('javascript#remove-debugger transform', () => {
  it('should not modify files with no debugger statements', async () => {
    const result = await applyTransform(transformer, `console.log('foooo');`, {
      parser: 'tsx',
    });

    expect(result).toMatchInlineSnapshot(`"console.log('foooo');"`);
  });

  it('should remove top-level debugger statement', async () => {
    const result = await applyTransform(transformer, 'debugger;', {
      parser: 'tsx',
    });

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should debuggers in function statements', async () => {
    const result = await applyTransform(
      transformer,
      `
function foo () {
  debugger;
  setTimeout(() => { debugger; console.log('foo') });debugger;
}
    `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`
      "function foo () {
        setTimeout(() => {
          console.log('foo')
        });
      }"
    `);
  });
});
