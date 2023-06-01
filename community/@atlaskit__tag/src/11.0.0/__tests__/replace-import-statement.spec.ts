import { API, FileInfo, Options } from 'jscodeshift';
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

import { replaceImportStatement } from '../motions/replace-import-statements';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  replaceImportStatement(j, source);

  return source.toSource(options.printOptions);
}

describe('Update entry point for importing', () => {
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
      import Tag from "@atlaskit/tag/removable-tag";

      export default () => <Tag text="Removable button"/>;
    `,
    'should change entry point for importing',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import Tag, { TagColor } from "@atlaskit/tag";

      export default () => <Tag text="Removable button"/>;
    `,
    `
      import React from "react";
      import Tag from "@atlaskit/tag/removable-tag";
      import { TagColor } from "@atlaskit/tag";

      export default () => <Tag text="Removable button"/>;
    `,
    'should change entry point for importing with multiple import entities',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import AKTag, { TagColor } from "@atlaskit/tag";

      export default () => <AKTag text="Removable button"/>;
    `,
    `
      import React from "react";
      import AKTag from "@atlaskit/tag/removable-tag";
      import { TagColor } from "@atlaskit/tag";

      export default () => <AKTag text="Removable button"/>;
    `,
    'should change entry point for importing with multiple import entities with alias',
  );
});
