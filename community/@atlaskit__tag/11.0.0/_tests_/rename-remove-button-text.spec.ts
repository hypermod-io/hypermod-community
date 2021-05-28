import { API, FileInfo, Options } from 'jscodeshift';
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

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
    'should not rename removeButtonText if it is not provided',
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

      export default () => <Tag text="Removable button" removeButtonLabel=""/>;
    `,
    'should rename removeButtonText to removeButtonLabel',
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

      export default () => <Tag text="Removable button" removeButtonLabel="Remove" />;
    `,
    'should rename removeButtonText to removeButtonLabel with value',
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

      export default () => <RemovableTag text="Removable button" removeButtonLabel="Remove" />;
    `,
    'should rename removeButtonText to removeButtonLabel with alias',
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

      export default () => <RemovableTag text="Removable button" removeButtonLabel={removeButtonLabel} />;
    `,
    'should rename removeButtonText to removeButtonLabel with alias when there is a removeButtonText defined as a variable',
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
          <Tag text="Removable button" removeButtonLabel="Remove" />
          <Tag text="Removable button" removeButtonLabel={removeButtonLabel} />
          <Tag text="Removable button" />
        </div>);
    `,
    'should rename removeButtonText to removeButtonLabel for different cases',
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
    'should NOT rename removeButtonText to removeButtonLabel  when it is SimpleTag',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
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
              removeButtonLabel="Remove me"
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
    'should rename removeButtonText to removeButtonLabel with value',
  );
});
