import { applyTransform } from '@codeshift/test-utils';
import * as transformer from './transform';

describe('javascript#var-to-let transform', () => {
  it('should replace var with let', async () => {
    const result = await applyTransform(transformer, `var foo = 'foo'`, {
      parser: 'tsx',
    });

    expect(result).toMatchInlineSnapshot(`"let foo = 'foo';"`);
  });
});
