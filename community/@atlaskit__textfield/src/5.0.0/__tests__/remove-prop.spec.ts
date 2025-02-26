import { applyTransform } from '@hypermod/utils';
import { API, FileInfo, Options } from 'jscodeshift';

import { removeThemeProp } from '../motions/remove-props';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  removeThemeProp(j, source);

  return source.toSource(options.printOptions);
}

describe('Remove prop', () => {
  it('should remove theme from Textfield and leave a comment', async () => {
    const result = await applyTransform(
      transformer,
      `
    import React from 'react';
    import Textfield from '@atlaskit/textfield';
    import customeTheme from './theme';

    const SimpleTextfield = () => {
      return (
        <Textfield
          theme={customTheme}
        />
      );
    }
  `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "/* TODO: (@hypermod) This file uses the @atlaskit/textfield \`theme\` prop which
          has now been removed due to its poor performance characteristics. We have not replaced
          theme with an equivalent API due to minimal usage of the \`theme\` prop.
          The appearance of TextField will have likely changed. */
          import React from 'react';
          import Textfield from '@atlaskit/textfield';
          import customeTheme from './theme';

          const SimpleTextfield = () => {
            return (<Textfield />);
          }"
    `);
  });

  it('should remove theme from TextField and leave a comment', async () => {
    const result = await applyTransform(
      transformer,
      `
    import React from 'react';
    import TextField from '@atlaskit/textfield';
    import customeTheme from './theme';

    const SimpleTextfield = () => {
      return (
        <TextField
          theme={customTheme}
        />
      );
    }
  `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "/* TODO: (@hypermod) This file uses the @atlaskit/textfield \`theme\` prop which
          has now been removed due to its poor performance characteristics. We have not replaced
          theme with an equivalent API due to minimal usage of the \`theme\` prop.
          The appearance of TextField will have likely changed. */
          import React from 'react';
          import TextField from '@atlaskit/textfield';
          import customeTheme from './theme';

          const SimpleTextfield = () => {
            return (<TextField />);
          }"
    `);
  });

  it('should remove 2 usages of theme and add 1 comment', async () => {
    const result = await applyTransform(
      transformer,
      `
    import React from 'react';
    import Textfield from '@atlaskit/textfield';
    import customeTheme from './theme';

    const SimpleTextfield = () => {
      return (
        <div>
          <Textfield
            theme={customTheme}
          />
          <Textfield
            theme={customTheme}
          />
        </div>
      );
    }
  `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      /* TODO: (@hypermod) This file uses the @atlaskit/textfield \`theme\` prop
      which has now been removed due to its poor performance characteristics.
      We have not replaced theme with an equivalent API due to minimal usage
      of the \`theme\` prop. The appearance of TextField will have likely changed.
      */ import React from 'react'; import Textfield from '@atlaskit/textfield';
      import customeTheme from './theme'; const SimpleTextfield = () => { return
      ( (
      <div>
        <Textfield />
        <Textfield />
      </div>) ); }
    `);
  });

  it('should remove theme prop when using an aliased name', async () => {
    const result = await applyTransform(
      transformer,
      `
    import React from 'react';
    import Foo from '@atlaskit/textfield';
    import customeTheme from './theme';

    const SimpleTextfield = () => {
      return (
        <Foo
          theme={customeTheme}
        />
      );
    }
  `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "/* TODO: (@hypermod) This file uses the @atlaskit/textfield \`theme\` prop which
          has now been removed due to its poor performance characteristics. We have not replaced
          theme with an equivalent API due to minimal usage of the \`theme\` prop.
          The appearance of TextField will have likely changed. */
          import React from 'react';
          import Foo from '@atlaskit/textfield';
          import customeTheme from './theme';

          const SimpleTextfield = () => {
            return (<Foo />);
          }"
    `);
  });
});
