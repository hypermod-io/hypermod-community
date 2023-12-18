import { applyTransform } from '@hypermod/utils';
import { API, FileInfo, Options } from 'jscodeshift';
import elevateStateless from '../motions/elevate-stateless';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  elevateStateless(j, source);

  return source.toSource(options.printOptions);
}

describe('Merge Toggle and ToggleStateless', () => {
  it('nothing would change if Toggle is used', async () => {
    const result = await applyTransform(
      transformer,
      `
    import React from 'react';
    import Toggle from "@atlaskit/toggle";

    export default () => (
      <Toggle size="large" defaultChecked />
    );
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from 'react';
          import Toggle from "@atlaskit/toggle";

          export default () => (
            <Toggle size="large" defaultChecked />
          );"
    `);
  });

  it('change to new Toggle when ToggleStateless is used', async () => {
    const result = await applyTransform(
      transformer,
      `
    import React from 'react';
    import { ToggleStateless } from "@atlaskit/toggle";

    export default () => (
      <ToggleStateless size="large" isChecked />
    );
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from 'react';
          import ToggleStateless from "@atlaskit/toggle";

          export default () => (
            <ToggleStateless size="large" isChecked />
          );"
    `);
  });

  it('change to new Toggle when ToggleStateless is used, with alias', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import { ToggleStateless as Toggle } from "@atlaskit/toggle";

      export default () => (
        <Toggle size="large" isChecked />
      );
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from 'react';
            import Toggle from "@atlaskit/toggle";

            export default () => (
              <Toggle size="large" isChecked />
            );"
    `);
  });
});
