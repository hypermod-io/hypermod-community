import { applyTransform } from '@hypermod/utils';

import transformer from '../transform';

describe('@atlaskit/icon@21.2.0 transform', () => {
  it('should replace named metadata import from main entry point with default import from dedicated entry point', async () => {
    const result = await applyTransform(
      transformer,
      `
        import { metadata } from '@atlaskit/icon';
        console.log(metadata);
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import metadata from "@atlaskit/icon/metadata";
              console.log(metadata);"
    `);
  });
  it('should preserve renaming when converting from named import to default import', async () => {
    const result = await applyTransform(
      transformer,
      `
        import { metadata as data } from '@atlaskit/icon';
        console.log(data);
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import data from "@atlaskit/icon/metadata";
              console.log(data);"
    `);
  });
  it('should preserve other named imports', async () => {
    const result = await applyTransform(
      transformer,
      `
      import { a, metadata, b } from '@atlaskit/icon';
      console.log(metadata);
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import metadata from "@atlaskit/icon/metadata";
            import { a, b } from '@atlaskit/icon';
            console.log(metadata);"
    `);
  });
  it('should preserve other named imports, as well as metadata renaming', async () => {
    const result = await applyTransform(
      transformer,
      `
        import { a, metadata as data, b } from '@atlaskit/icon';
        console.log(data);
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import data from "@atlaskit/icon/metadata";
              import { a, b } from '@atlaskit/icon';
              console.log(data);"
    `);
  });
  it('should preserve other named imports and default import, as well as metadata renaming', async () => {
    const result = await applyTransform(
      transformer,
      `
        import Icon, { a, metadata as data, b } from '@atlaskit/icon';
        console.log(a, data, b);
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import data from "@atlaskit/icon/metadata";
              import Icon, { a, b } from '@atlaskit/icon';
              console.log(a, data, b);"
    `);
  });
  it('should not affect existing good imports', async () => {
    const result = await applyTransform(
      transformer,
      `
      import metadata from "@atlaskit/icon/metadata";
      console.log(metadata);
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import metadata from "@atlaskit/icon/metadata";
            console.log(metadata);"
    `);
  });
  it('should not affect other packages', async () => {
    const result = await applyTransform(
      transformer,
      `
      import { metadata } from 'not-@atlaskit/icon';
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(
      `"import { metadata } from 'not-@atlaskit/icon';"`,
    );
  });
  it('should not affect other entrypoints', async () => {
    const result = await applyTransform(
      transformer,
      `
      import { metadata } from '@atlaskit/icon/foo';
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(
      `"import { metadata } from '@atlaskit/icon/foo';"`,
    );
  });
  it('should work as expected on a real-world case', async () => {
    const result = await applyTransform(
      transformer,
      `
      import { metadata } from '@atlaskit/icon';
      import { metadata as objectIconMetadata } from '@atlaskit/icon-object';
      import { metadata as fileTypeIconMetadata } from '@atlaskit/icon-file-type';
      import { metadata as priorityIconMetadata } from '@atlaskit/icon-priority';
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import metadata from "@atlaskit/icon/metadata";
            import { metadata as objectIconMetadata } from '@atlaskit/icon-object';
            import { metadata as fileTypeIconMetadata } from '@atlaskit/icon-file-type';
            import { metadata as priorityIconMetadata } from '@atlaskit/icon-priority';"
    `);
  });
});
