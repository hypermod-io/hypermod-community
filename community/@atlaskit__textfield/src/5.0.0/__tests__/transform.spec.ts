import { applyTransform } from '@hypermod/utils';

import transformer from '../transform';

describe('@atlaskit/textfield@5.0.0 transform', () => {
  it('should remove theme & its imports from Textfield and leave a comment', async () => {
    const result = await applyTransform(
      transformer,
      `
        import Textfield, { ThemeProps, ThemeAppearance , themeTokens as ColorTokens, ThemeTokens } from '@atlaskit/textfield';
        import customeTheme from './theme';
        import React from 'react';

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
              /* TODO: (@hypermod) This file uses exports used to help theme @atlaskit/textfield which
              has now been removed due to its poor performance characteristics. */
              import Textfield, { Appearance, TextFieldColors as ColorTokens } from '@atlaskit/textfield';
              import customeTheme from './theme';
              import React from 'react';

              const SimpleTextfield = () => {
                return <Textfield />;
              }"
    `);
  });
  it('should remove theme prop & its imports from Textfield and leave a comment', async () => {
    const result = await applyTransform(
      transformer,
      `
        import Textfield, { ThemeProps, ThemeTokens } from '@atlaskit/textfield';
        import React from 'react';

        const SimpleTextfield = () => {
          return (
            <Textfield
              theme={(theme, props: ThemeProps) => {
                const { container, input, ...rest } = theme(props);
                return {
                  ...rest,
                  container: {
                    ...container,
                    padding: 5,
                    border: '2px solid orange',
                  },
                  input: {
                    ...input,
                    fontSize: 20,
                    border: '2px solid green',
                  },
                };
              }}
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
              /* TODO: (@hypermod) This file uses exports used to help theme @atlaskit/textfield which
              has now been removed due to its poor performance characteristics. */
              import Textfield from '@atlaskit/textfield';
              import React from 'react';

              const SimpleTextfield = () => {
                return <Textfield />;
              }"
    `);
  });
});
