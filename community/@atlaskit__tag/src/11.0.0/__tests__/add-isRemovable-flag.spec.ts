import { applyTransform } from '@hypermod/utils';
import { API, FileInfo, Options } from 'jscodeshift';

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
  it('should not add isRemovable flag when no removeButtonText defined', async () => {
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
              import Tag from "@atlaskit/tag";

              export default () => <Tag text="Removable button"/>;"
    `);
  });

  it('should not adding isRemovable flag when removeButtonText has empty text', async () => {
    const result = await applyTransform(
      transformer,
      `
        import React from "react";
        import Tag from "@atlaskit/tag";

        export default () => <Tag text="Removable button" removeButtonText=""/>;
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
              import Tag from "@atlaskit/tag";

              export default () => <Tag text="Removable button" removeButtonText=""/>;"
    `);
  });

  it('should add isRemovable flag when there is a removeButtonText defined', async () => {
    const result = await applyTransform(
      transformer,
      `
        import React from "react";
        import Tag from "@atlaskit/tag";

        export default () => <Tag text="Removable button" removeButtonText="Remove" />;
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
              import Tag from "@atlaskit/tag";

              export default () => <Tag text="Removable button" isRemovable removeButtonText="Remove" />;"
    `);
  });

  it('should add isRemovable flag when there is a removeButtonText defined for importing tag with alias', async () => {
    const result = await applyTransform(
      transformer,
      `
        import React from "react";
        import RemovableTag from "@atlaskit/tag";

        export default () => <RemovableTag text="Removable button" removeButtonText="Remove" />;
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
              import RemovableTag from "@atlaskit/tag";

              export default () => <RemovableTag text="Removable button" isRemovable removeButtonText="Remove" />;"
    `);
  });

  it('should add isRemovable flag when there is a removeButtonText defined as a variable', async () => {
    const result = await applyTransform(
      transformer,
      `
        import React from "react";
        import RemovableTag from "@atlaskit/tag";

        const removeButtonLabel = "remove button";

        export default () => <RemovableTag text="Removable button" removeButtonText={removeButtonLabel} />;
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
              import RemovableTag from "@atlaskit/tag";

              const removeButtonLabel = "remove button";

              export default () => <RemovableTag text="Removable button" isRemovable removeButtonText={removeButtonLabel} />;"
    `);
  });

  it('should add isRemovable flag for different cases', async () => {
    const result = await applyTransform(
      transformer,
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
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from "react"; import Tag from "@atlaskit/tag"; const removeButtonLabel
      = "remove button"; export default () => (
      <div>
        <Tag text="Removable button" isRemovable removeButtonText="Remove" />
        <Tag text="Removable button" isRemovable removeButtonText={removeButtonLabel}
        />
        <Tag text="Removable button" />
      </div>);
    `);
  });

  it('should not add isRemovable flag when it is SimpleTag', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from "react";
      import { SimpleTag as Tag } from "@atlaskit/tag";

      export default () => <Tag text="Removable button" removeButtonText="Remove" />;
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
            import { SimpleTag as Tag } from "@atlaskit/tag";

            export default () => <Tag text="Removable button" removeButtonText="Remove" />;"
    `);
  });

  it('should not add isRemovable flag when it is from other tag lib', async () => {
    const result = await applyTransform(
      transformer,
      `
        import React from "react";
        import Tag from "@facebook/tag";

        export default () => <Tag text="Removable button" removeButtonText="Remove" />;
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
              import Tag from "@facebook/tag";

              export default () => <Tag text="Removable button" removeButtonText="Remove" />;"
    `);
  });
});
