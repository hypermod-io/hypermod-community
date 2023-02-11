import { applyTransform } from '@codeshift/test-utils';
import * as transformer from './transform';

describe('<% packageName %><% seperator %><% transform %> transform', () => {
  it('should transform correctly', async () => {
    const result = await applyTransform(
      transformer,
      `
        import foo from '<% packageName %>';
        console.log(foo);
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot();
  });
});
