import { applyTransform } from '@hypermod/utils';
import * as transformer from './transform';

describe('react#sort-jsx-props transform', () => {
  it('should sort props correctly', async () => {
    const result = await applyTransform(
      transformer,
      `
<Music
  zootWoman={true}
  alpha
  rickJames={true}
  zapp={true}
/>
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`
      "<Music
        alpha
        rickJames={true}
        zapp={true}
        zootWoman={true}
      />"
    `);
  });

  it('should leave spread props in place to avoid breaking overrides', async () => {
    const result = await applyTransform(
      transformer,
      `
<Music
  zootWoman={true}
  alpha
  {...foo}
  zapp={true}
  rickJames={true}
/>
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`
      "<Music
        alpha
        zootWoman={true}
        {...foo}
        rickJames={true}
        zapp={true}
      />"
    `);
  });
});
