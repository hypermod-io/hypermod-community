import { API, FileInfo, Options } from 'jscodeshift';
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

import { addIsRemovableFlag } from '../motions/add-isRemovable-flag';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  addIsRemovableFlag(j, source);

  return source.toSource(options.printOptions);
}

describe('Update isRemovable prop', () => {
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

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import Tag from "@atlaskit/tag";

      export default () => <Tag text="Removable button" removeButtonText=""/>;
    `,
    `
      import React from "react";
      import Tag from "@atlaskit/tag";

      export default () => <Tag text="Removable button" removeButtonText=""/>;
    `,
    'should not adding isRemovable flag when removeButtonText has empty text',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import Tag from "@atlaskit/tag";

      export default () => <Tag text="Removable button" removeButtonText="Remove" />;
    `,
    `
      import React from "react";
      import Tag from "@atlaskit/tag";

      export default () => <Tag text="Removable button" isRemovable removeButtonText="Remove" />;
    `,
    'should add isRemovable flag when there is a removeButtonText defined',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import RemovableTag from "@atlaskit/tag";

      export default () => <RemovableTag text="Removable button" removeButtonText="Remove" />;
    `,
    `
      import React from "react";
      import RemovableTag from "@atlaskit/tag";

      export default () => <RemovableTag text="Removable button" isRemovable removeButtonText="Remove" />;
    `,
    'should add isRemovable flag when there is a removeButtonText defined for importing tag with alias',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import RemovableTag from "@atlaskit/tag";

      const removeButtonLabel = "remove button";

      export default () => <RemovableTag text="Removable button" removeButtonText={removeButtonLabel} />;
    `,
    `
      import React from "react";
      import RemovableTag from "@atlaskit/tag";

      const removeButtonLabel = "remove button";

      export default () => <RemovableTag text="Removable button" isRemovable removeButtonText={removeButtonLabel} />;
    `,
    'should add isRemovable flag when there is a removeButtonText defined as a variable',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import Tag from "@atlaskit/tag";

      const removeButtonLabel = "remove button";

      export default () => (
        <div>
          <Tag text="Removable button" removeButtonText="Remove" />
          <Tag text="Removable button" removeButtonText={removeButtonLabel} />
          <Tag text="Removable button" />
        </div>);
    `,
    `
      import React from "react";
      import Tag from "@atlaskit/tag";

      const removeButtonLabel = "remove button";

      export default () => (
        <div>
          <Tag text="Removable button" isRemovable removeButtonText="Remove" />
          <Tag text="Removable button" isRemovable removeButtonText={removeButtonLabel} />
          <Tag text="Removable button" />
        </div>);
    `,
    'should add isRemovable flag for different cases',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import { SimpleTag as Tag } from "@atlaskit/tag";

      export default () => <Tag text="Removable button" removeButtonText="Remove" />;
    `,
    `
      import React from "react";
      import { SimpleTag as Tag } from "@atlaskit/tag";

      export default () => <Tag text="Removable button" removeButtonText="Remove" />;
    `,
    'should not add isRemovable flag when it is SimpleTag',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import Tag from "@facebook/tag";

      export default () => <Tag text="Removable button" removeButtonText="Remove" />;
    `,
    `
      import React from "react";
      import Tag from "@facebook/tag";

      export default () => <Tag text="Removable button" removeButtonText="Remove" />;
    `,
    'should not add isRemovable flag when it is from other tag lib',
  );
});
