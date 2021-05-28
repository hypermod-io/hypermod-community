import { API, FileInfo, Options } from 'jscodeshift';
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

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
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import { themeTokens, ThemeAppearance } from '@atlaskit/textfield';
    `,
    `
    import { TextFieldColors, Appearance } from '@atlaskit/textfield';
    `,
    'should rename themeTokens & ThemeAppearance to TextFieldColors & Appearance',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import Textfield, { ThemeAppearance, themeTokens } from '@atlaskit/textfield';
    `,
    `
    import Textfield, { Appearance, TextFieldColors } from '@atlaskit/textfield';
  `,
    'should rename themeTokens & Appearance to TextFieldColors  & Appearance and keep Textfield default import as is',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import Textfield, { TextFieldProps, themeTokens } from '@atlaskit/textfield';
    `,
    `
    import Textfield, { TextFieldProps, TextFieldColors } from '@atlaskit/textfield';
  `,
    'should rename themeTokens to TextFieldColors and keep TextFieldProps as is',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import Textfield, { TextFieldProps, themeTokens as MyLifeMyColors } from '@atlaskit/textfield';
    `,
    `
    import Textfield, { TextFieldProps, TextFieldColors as MyLifeMyColors } from '@atlaskit/textfield';
  `,
    'should rename themeTokens to TextFieldColors and keep its alias name as is',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import Textfield, { ThemeProps as TextfieldThemeProp,
      ThemeAppearance as TextFieldAppearance, Theme as TextFieldTheme, themeTokens as MyLifeMyColors, ThemeTokens as TextfieldThemeTokens} from '@atlaskit/textfield';
    `,
    `
    import Textfield, { ThemeProps as TextfieldThemeProp,
      Appearance as TextFieldAppearance, Theme as TextFieldTheme, TextFieldColors as MyLifeMyColors, ThemeTokens as TextfieldThemeTokens} from '@atlaskit/textfield';
  `,
    'should rename themeTokens to TextFieldColors, ThemeAppearance to Appearance and keep its alias name as is even when there are multiple name exports with alias',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import { themeTokens, TextFieldProps } from '@atlaskit/textfield';
    `,
    `
    import { TextFieldColors, TextFieldProps } from '@atlaskit/textfield';
    `,
    'should rename themeTokens to TextFieldColors and keep TextFieldProps named import as is',
  );
});
