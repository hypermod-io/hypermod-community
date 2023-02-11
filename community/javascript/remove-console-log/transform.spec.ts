import { applyTransform } from '@codeshift/test-utils';
import * as transformer from './transform';

describe('javascript#remove-console-log transform', () => {
  it('should not modify files with no console.log statements', async () => {
    const result = await applyTransform(transformer, `foo();`, {
      parser: 'tsx',
    });

    expect(result).toMatchInlineSnapshot(`"foo();"`);
  });

  it('should remove top-level console.log statement', async () => {
    const result = await applyTransform(transformer, 'console.log("fff");', {
      parser: 'tsx',
    });

    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should console.logs in function statements', async () => {
    const result = await applyTransform(
      transformer,
      `
function foo () {
  setTimeout(() => { debugger; console.log('foo') });
}
    `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`
      "function foo () {
        setTimeout(() => {
          debugger;
        });
      }"
    `);
  });
});
