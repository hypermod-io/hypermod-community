import { applyTransform } from '@hypermod/utils';

import transformer from '../transform';

describe('@atlaskit/tag@11.0.0 transform', () => {
  it('should apply all 3 migrates', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from "react";
      import AKTag, { TagColor } from "@atlaskit/tag";

      export default () => <AKTag text="Removable button" removeButtonText="Remove" />;
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
            import AKTag from "@atlaskit/tag/removable-tag";
            import { TagColor } from "@atlaskit/tag";

            export default () => <AKTag text="Removable button" isRemovable removeButtonLabel="Remove" />;"
    `);
  });
});
