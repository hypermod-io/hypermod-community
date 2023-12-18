import { applyTransform } from '@hypermod/utils';
import { API, FileInfo, Options } from 'jscodeshift';

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
  it('should change entry point for importing', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from "react";
      import Tag from "@atlaskit/tag";

      export default () => <Tag text="Removable button"/>;
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
            import Tag from "@atlaskit/tag/removable-tag";

            export default () => <Tag text="Removable button"/>;"
    `);
  });

  it('should change entry point for importing with multiple import entities', async () => {
    const result = await applyTransform(
      transformer,
      `
        import React from "react";
        import Tag, { TagColor } from "@atlaskit/tag";

        export default () => <Tag text="Removable button"/>;
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
              import Tag from "@atlaskit/tag/removable-tag";
              import { TagColor } from "@atlaskit/tag";

              export default () => <Tag text="Removable button"/>;"
    `);
  });

  it('should change entry point for importing with multiple import entities with alias', async () => {
    const result = await applyTransform(
      transformer,
      `
        import React from "react";
        import AKTag, { TagColor } from "@atlaskit/tag";

        export default () => <AKTag text="Removable button"/>;
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
              import AKTag from "@atlaskit/tag/removable-tag";
              import { TagColor } from "@atlaskit/tag";

              export default () => <AKTag text="Removable button"/>;"
    `);
  });
});
