import { runTransform } from '@codeshift/test-utils';
import * as transformer from '../transform';

describe('<% packageName %>@<% version %> transform', () => {
  it('should transform correctly', () => {
    const result = runTransform(
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
