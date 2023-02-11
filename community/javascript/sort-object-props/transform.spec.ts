import { applyTransform } from '@codeshift/test-utils';
import * as transformer from './transform';

describe('javascript#sort-object-props transform', () => {
  it('should sort object props', async () => {
    const result = await applyTransform(
      transformer,
      `
const foo = {
  frog: 'frog',
  potato: 'potato',
  cat: 'cat',
  apple: 'apple',
  zebra: 'zebra',
  dog: 'dog',
}
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`
      "const foo = {
        apple: 'apple',
        cat: 'cat',
        dog: 'dog',
        frog: 'frog',
        potato: 'potato',
        zebra: 'zebra',
      }"
    `);
  });

  it('should not error on with empty objects', async () => {
    const result = await applyTransform(transformer, `const foo = {};`, {
      parser: 'tsx',
    });

    expect(result).toMatchInlineSnapshot(`"const foo = {};"`);
  });

  it('should handle nested objects', async () => {
    const result = await applyTransform(
      transformer,
      `
const foo = {
  frog: 'frog',
  potato: 'potato',
  cat: 'cat',
  apple: 'apple',
  dogs: {
    wolf: 'wolf',
    staffy: 'staffy',
    puppy: 'puppy',
    poodle: 'poodle',
  },
  zebra: 'zebra',
}
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "const foo = {
        apple: 'apple',
        cat: 'cat',
        dogs: {
          poodle: 'poodle',
          puppy: 'puppy',
          staffy: 'staffy',
          wolf: 'wolf',
        },
        frog: 'frog',
        potato: 'potato',
        zebra: 'zebra',
      }"
    `);
  });
});
