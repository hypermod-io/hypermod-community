import { applyTransform } from '@hypermod/utils';

import transformer from '../transform';

describe('@atlaskit/toggle@12.0.0 transform', () => {
  it('change ToggleStateless to Toggle', async () => {
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
          import Toggle from "@atlaskit/toggle";

          export default () => (
            <Toggle size="large" isChecked />
          );"
    `);
  });

  it('convert toggle and toggle-statelss when they show up together', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import Toggle, { ToggleStateless } from "@atlaskit/toggle";

      export default () => (
        <>
          <Toggle size="large" isChecked />
          <ToggleStateless size="large" isChecked />
        </>
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
              <>
                <Toggle size="large" isChecked />
                <Toggle size="large" isChecked />
              </>
            );"
    `);
  });

  it('fallback to DSToggle if name Toggle has been used', async () => {
    const result = await applyTransform(
      transformer,
      `
    import React from 'react';
    import Toggle from '@material-ui/toggle';
    import { ToggleStateless } from "@atlaskit/toggle";

    export default () => (
      <>
        <Toggle text="switch"/>
        <ToggleStateless size="large" isChecked />
      </>
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
            <>
              <Toggle text="switch"/>
              <DSToggle size="large" isChecked />
            </>
          );"
    `);
  });

  it('convert toggle and toggle-statelss when they show up together', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import Toggle, { ToggleStateless } from "@atlaskit/toggle";

      const checked = true;
      export default () => (
        <>
          <Toggle size="large" isChecked defaultChecked={checked} />
          <ToggleStateless size="large" isChecked />
        </>
      );
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from 'react';
            import Toggle from "@atlaskit/toggle";

            const checked = true;
            export default () => (
              <>
                <Toggle size="large" isChecked defaultChecked={checked} />
                <Toggle size="large" isChecked />
              </>
            );"
    `);
  });
});
