// hypermod: Run "tsc" to verify the updated @types/jscodeshift@1.0.0 types.
import { applyTransform } from '@hypermod/utils';
import * as transformer from './transform';

describe('react#use-string-literal-props transform', () => {
  it('should remove redundant literal props', async () => {
    const result = await applyTransform(
      transformer,
      `
const SomeComponent = () => (
  <AnotherComponent
    foo={'string'}
    label={\`template with 0 substitutions\`}
    whatever={\`template with \${1} substitution\`}
  />
);
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`
      "const SomeComponent = () => (
        <AnotherComponent
          foo="string"
          label="template with 0 substitutions"
          whatever={\`template with \${1} substitution\`}
        />
      );"
    `);
  });
});
