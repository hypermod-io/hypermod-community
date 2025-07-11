import { applyTransform } from '@hypermod/utils';
import { API, FileInfo, Options } from 'jscodeshift';

import { renameRemoveButtonText } from '../motions/rename-remove-button-text';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  renameRemoveButtonText(j, source);

  return source.toSource(options.printOptions);
}

describe('Rename removeButtonText prop to removeButtonLabel prop', () => {
  it('should not rename removeButtonText if it is not provided', async () => {
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

  it('should rename removeButtonText to removeButtonLabel', async () => {
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

            export default () => <Tag text="Removable button" removeButtonLabel=""/>;"
    `);
  });

  it('should rename removeButtonText to removeButtonLabel with value', async () => {
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

              export default () => <Tag text="Removable button" removeButtonLabel="Remove" />;"
    `);
  });

  it('should rename removeButtonText to removeButtonLabel with alias', async () => {
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

              export default () => <RemovableTag text="Removable button" removeButtonLabel="Remove" />;"
    `);
  });

  it('should rename removeButtonText to removeButtonLabel with alias when there is a removeButtonText defined as a variable', async () => {
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

              export default () => <RemovableTag text="Removable button" removeButtonLabel={removeButtonLabel} />;"
    `);
  });

  it('should rename removeButtonText to removeButtonLabel for different cases', async () => {
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
        <Tag text="Removable button" removeButtonLabel="Remove" />
        <Tag text="Removable button" removeButtonLabel={removeButtonLabel} />
        <Tag text="Removable button" />
      </div>);
    `);
  });

  it('should NOT rename removeButtonText to removeButtonLabel  when it is SimpleTag', async () => {
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

  it('should rename removeButtonText to removeButtonLabel with value', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React, { useState } from 'react';

      import Tag from '@atlaskit/tag';
      import TagGroup from '@atlaskit/tag-group';

      interface Props {
        alignment: 'start' | 'end';
      }

      export function MyTagGroup({ alignment }: Props) {
        const [tags, setTags] = useState([
          'Candy canes',
          'Tiramisu',
          'Gummi bears',
          'Wagon Wheels',
        ]);

        const handleRemoveRequest = () => true;

        const handleRemoveComplete = (text: string) => {
          setTags(tags.filter(str => str !== text));
        };

        return (
          <TagGroup alignment={alignment}>
            {tags.map(text => (
              <Tag
                key={text}
                onAfterRemoveAction={handleRemoveComplete}
                onBeforeRemoveAction={handleRemoveRequest}
                removeButtonText="Remove me"
                text={text}
              />
            ))}
          </TagGroup>
        );
      }

      export default () => (
        <div>
          <MyTagGroup alignment="start" />
          <MyTagGroup alignment="end" />
        </div>
      );
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React, { useState } from 'react'; import Tag from '@atlaskit/tag';
      import TagGroup from '@atlaskit/tag-group'; interface Props { alignment:
      'start' | 'end'; } export function MyTagGroup({ alignment }: Props) { const
      [tags, setTags] = useState([ 'Candy canes', 'Tiramisu', 'Gummi bears',
      'Wagon Wheels', ]); const handleRemoveRequest = () => true; const handleRemoveComplete
      = (text: string) => { setTags(tags.filter(str => str !== text)); }; return
      ( (
      <TagGroup alignment={alignment}>{tags.map(text => (
        <Tag key={text} onAfterRemoveAction={handleRemoveComplete}
        onBeforeRemoveAction={handleRemoveRequest} removeButtonLabel="Remove me"
        text={text} />))}</TagGroup>) ); } export default () => (
      <div>
        <MyTagGroup alignment="start" />
        <MyTagGroup alignment="end" />
      </div>);
    `);
  });
});
