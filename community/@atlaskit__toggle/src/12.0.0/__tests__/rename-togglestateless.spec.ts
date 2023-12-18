import { applyTransform } from '@hypermod/utils';
import { API, FileInfo, Options } from 'jscodeshift';
import renameToggleStateless from '../motions/rename-togglestateless';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  renameToggleStateless(j, source);

  return source.toSource(options.printOptions);
}

describe('Change ToggleStateless to Toggle', () => {
  it('change ToggleStateless to Toggle', async () => {
    const result = await applyTransform(
      transformer,
      `
    import React from 'react';
    import ToggleStateless from "@atlaskit/toggle";

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
          import Toggle from "@atlaskit/toggle";

          export default () => (
            <Toggle size="large" isChecked />
          );"
    `);
  });

  it('change ToggleStateless to DSToggle when name get conflict', async () => {
    const result = await applyTransform(
      transformer,
      `
    import React from 'react';
    import Toggle from '@material-ui/toggle';
    import ToggleStateless from "@atlaskit/toggle";

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
          import Toggle from '@material-ui/toggle';
          import DSToggle from "@atlaskit/toggle";

          export default () => (
            <DSToggle size="large" isChecked />
          );"
    `);
  });

  it('change ToggleStateless to Toggle', async () => {
    const result = await applyTransform(
      transformer,
      `
    import React from 'react';
    import ToggleStateless from "@atlaskit/toggle";

    export default () => (
      <>
        <section>
          <ToggleStateless size="large" isChecked />
        </section>
        <section>
          <ToggleStateless size="large" isChecked isDisabled />
        </section>
      </>
    );
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from 'react'; import Toggle from "@atlaskit/toggle"; export
      default () => (
      <>
        <section>
          <Toggle size="large" isChecked />
        </section>
        <section>
          <Toggle size="large" isChecked isDisabled />
        </section>
        </>);
    `);
  });
});
