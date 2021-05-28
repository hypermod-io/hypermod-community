import { API, FileInfo, Options } from 'jscodeshift';
import elevateStateless from '../motions/elevate-stateless';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

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
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from 'react';
    import Toggle from "@atlaskit/toggle";

    export default () => (
      <Toggle size="large" defaultChecked />
    );
    `,
    `
    import React from 'react';
    import Toggle from "@atlaskit/toggle";

    export default () => (
      <Toggle size="large" defaultChecked />
    );
    `,
    'nothing would change if Toggle is used',
  );

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
    import ToggleStateless from "@atlaskit/toggle";

    export default () => (
      <ToggleStateless size="large" isChecked />
    );
    `,
    'change to new Toggle when ToggleStateless is used',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from 'react';
    import { ToggleStateless as Toggle } from "@atlaskit/toggle";

    export default () => (
      <Toggle size="large" isChecked />
    );
    `,
    `
    import React from 'react';
    import Toggle from "@atlaskit/toggle";

    export default () => (
      <Toggle size="large" isChecked />
    );
    `,
    'change to new Toggle when ToggleStateless is used, with alias',
  );
});
