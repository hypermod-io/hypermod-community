import { applyTransform } from '@hypermod/utils';
import { API, FileInfo, Options } from 'jscodeshift';

import { removeThemeImports } from '../motions/remove-imports';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  removeThemeImports(j, source);

  return source.toSource(options.printOptions);
}

describe('Remove imports', () => {
  it('should remove theme imports from Textfield and leave a comment', async () => {
    const result = await applyTransform(
      transformer,
      `
      import Textfield, { Theme, ThemeProps, ThemeTokens } from '@atlaskit/textfield';
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "/* TODO: (@hypermod) This file uses exports used to help theme @atlaskit/textfield which
            has now been removed due to its poor performance characteristics. */
            import Textfield from '@atlaskit/textfield';"
    `);
  });
  it('should remove theme imports with alias name from Textfield and leave a comment', async () => {
    const result = await applyTransform(
      transformer,
      `
      import Textfield, { ThemeProps as TextfieldThemeProp, Theme as TextFieldTheme, ThemeTokens as TextfieldThemeTokens} from '@atlaskit/textfield';
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "/* TODO: (@hypermod) This file uses exports used to help theme @atlaskit/textfield which
            has now been removed due to its poor performance characteristics. */
            import Textfield from '@atlaskit/textfield';"
    `);
  });
  it('should remove theme imports & leave other imports from Textfield and leave a comment', async () => {
    const result = await applyTransform(
      transformer,
      `
      import { TextFieldProps, ThemeProps, Theme, ThemeTokens } from '@atlaskit/textfield';
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "/* TODO: (@hypermod) This file uses exports used to help theme @atlaskit/textfield which
            has now been removed due to its poor performance characteristics. */
            import { TextFieldProps } from '@atlaskit/textfield';"
    `);
  });
  it('should remove theme imports & remove whole line if no default import from Textfield and leave a comment', async () => {
    const result = await applyTransform(
      transformer,
      `
      import { ThemeProps, ThemeTokens, Theme } from '@atlaskit/textfield';
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "/* TODO: (@hypermod) This file uses exports used to help theme @atlaskit/textfield which
            has now been removed due to its poor performance characteristics. */"
    `);
  });
});
