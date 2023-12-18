import { applyTransform } from '@hypermod/utils';
import { API, FileInfo, Options } from 'jscodeshift';

import {
  renameThemeAppearanceImport,
  renamethemeTokensImport,
} from '../motions/rename-imports';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  renamethemeTokensImport(j, source);
  renameThemeAppearanceImport(j, source);

  return source.toSource(options.printOptions);
}

describe('Rename imports', () => {
  it('should rename themeTokens & ThemeAppearance to TextFieldColors & Appearance', async () => {
    const result = await applyTransform(
      transformer,
      `
      import { themeTokens, ThemeAppearance } from '@atlaskit/textfield';
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(
      `"import { TextFieldColors, Appearance } from '@atlaskit/textfield';"`,
    );
  });
  it('should rename themeTokens & Appearance to TextFieldColors  & Appearance and keep Textfield default import as is', async () => {
    const result = await applyTransform(
      transformer,
      `
      import Textfield, { ThemeAppearance, themeTokens } from '@atlaskit/textfield';
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(
      `"import Textfield, { Appearance, TextFieldColors } from '@atlaskit/textfield';"`,
    );
  });
  it('should rename themeTokens to TextFieldColors and keep TextFieldProps as is', async () => {
    const result = await applyTransform(
      transformer,
      `
      import Textfield, { TextFieldProps, themeTokens } from '@atlaskit/textfield';
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(
      `"import Textfield, { TextFieldProps, TextFieldColors } from '@atlaskit/textfield';"`,
    );
  });
  it('should rename themeTokens to TextFieldColors and keep its alias name as is', async () => {
    const result = await applyTransform(
      transformer,
      `
      import Textfield, { TextFieldProps, themeTokens as MyLifeMyColors } from '@atlaskit/textfield';
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(
      `"import Textfield, { TextFieldProps, TextFieldColors as MyLifeMyColors } from '@atlaskit/textfield';"`,
    );
  });
  it('should rename themeTokens to TextFieldColors, ThemeAppearance to Appearance and keep its alias name as is even when there are multiple name exports with alias', async () => {
    const result = await applyTransform(
      transformer,
      `
      import Textfield, { ThemeProps as TextfieldThemeProp,
        ThemeAppearance as TextFieldAppearance, Theme as TextFieldTheme, themeTokens as MyLifeMyColors, ThemeTokens as TextfieldThemeTokens} from '@atlaskit/textfield';
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import Textfield, { ThemeProps as TextfieldThemeProp,
              Appearance as TextFieldAppearance, Theme as TextFieldTheme, TextFieldColors as MyLifeMyColors, ThemeTokens as TextfieldThemeTokens} from '@atlaskit/textfield';"
    `);
  });
  it('should rename themeTokens to TextFieldColors and keep TextFieldProps named import as is', async () => {
    const result = await applyTransform(
      transformer,
      `
      import { themeTokens, TextFieldProps } from '@atlaskit/textfield';
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(
      `"import { TextFieldColors, TextFieldProps } from '@atlaskit/textfield';"`,
    );
  });
});
