const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

import transformer from '../transform';

describe('@atlaskit/toggle@12.0.0 transform', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from 'react';
    import { ToggleStateless } from "@atlaskit/toggle";

    export default () => (
      <ToggleStateless size="large" isChecked />
    );
    `,
    `
    import React from 'react';
    import Toggle from "@atlaskit/toggle";

    export default () => (
      <Toggle size="large" isChecked />
    );
    `,
    'change ToggleStateless to Toggle',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
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
    `
    import React from 'react';
    import Toggle from "@atlaskit/toggle";

    export default () => (
      <>
        <Toggle size="large" isChecked />
        <Toggle size="large" isChecked />
      </>
    );
    `,
    'convert toggle and toggle-statelss when they show up together',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
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
    `
    import React from 'react';
    import Toggle from '@material-ui/toggle';
    import DSToggle from "@atlaskit/toggle";

    export default () => (
      <>
        <Toggle text="switch"/>
        <DSToggle size="large" isChecked />
      </>
    );
    `,
    'fallback to DSToggle if name Toggle has been used',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
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
    `
    import React from 'react';
    import Toggle from "@atlaskit/toggle";

    const checked = true;
    export default () => (
      <>
        <Toggle size="large" isChecked defaultChecked={checked} />
        <Toggle size="large" isChecked />
      </>
    );
    `,
    'convert toggle and toggle-statelss when they show up together',
  );
});
