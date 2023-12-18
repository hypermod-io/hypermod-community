# hypermod#defineInlineTest-to-applyTransform

Codemods for hypermod#defineInlineTest-to-applyTransform

This codemod transforms test cases written with `defineInlineTest` from ` jscodeshift`` to use the  `applyTransform`function from`@hypermod/utils`. Below is an example of the transformation:

```js
/* INPUT */
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

defineInlineTest(
  { default: transformer, parser: 'tsx' },
  {},
  `
      import React from "react";
      import Tag from "@atlaskit/tag";
      export default () => <Tag text="Removable button"/>;
    `,
  `
      import React from "react";
      import Tag from "@atlaskit/tag";
      export default () => <Tag text="Removable button"/>;
    `,
  'should not add isRemovable flag when no removeButtonText defined',
);

/* OUTPUT */
import { applyTransform } from '@hypermod/utils';

it('should not add isRemovable flag when no removeButtonText defined', async () => {
  const result = await applyTransform(
    transformer,
    `
      import React from "react";
      import Tag from "@atlaskit/tag";
      export default () => <Tag text="Removable button"/>;
    `,
    { parser: 'tsx' },
  );
  expect(result).toMatchInlineSnapshot(`
    "import React from "react";
    import Tag from "@atlaskit/tag";
    export default () => <Tag text="Removable button"/>;"
  `);
});
```
