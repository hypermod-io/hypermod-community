import { API, FileInfo, Options } from 'jscodeshift';
import renameToggleStateless from '../motions/rename-togglestateless';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

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
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from 'react';
    import ToggleStateless from "@atlaskit/toggle";

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
    import Toggle from '@material-ui/toggle';
    import ToggleStateless from "@atlaskit/toggle";

    export default () => (
      <ToggleStateless size="large" isChecked />
    );
    `,
    `
    import React from 'react';
    import Toggle from '@material-ui/toggle';
    import DSToggle from "@atlaskit/toggle";

    export default () => (
      <DSToggle size="large" isChecked />
    );
    `,
    'change ToggleStateless to DSToggle when name get conflict',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
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
    `
    import React from 'react';
    import Toggle from "@atlaskit/toggle";

    export default () => (
      <>
        <section>
          <Toggle size="large" isChecked />
        </section>
        <section>
          <Toggle size="large" isChecked isDisabled />
        </section>
      </>
    );
    `,
    'change ToggleStateless to Toggle',
  );
});
