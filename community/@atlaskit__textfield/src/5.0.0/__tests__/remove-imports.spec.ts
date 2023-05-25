import { API, FileInfo, Options } from 'jscodeshift';
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

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

const importToDoComment = `
/* TODO: (@codeshift) This file uses exports used to help theme @atlaskit/textfield which
    has now been removed due to its poor performance characteristics. */`;

describe('Remove imports', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import Textfield, { Theme, ThemeProps, ThemeTokens } from '@atlaskit/textfield';
    `,
    `
    ${importToDoComment}
    import Textfield from '@atlaskit/textfield';
  `,
    'should remove theme imports from Textfield and leave a comment',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import Textfield, { ThemeProps as TextfieldThemeProp, Theme as TextFieldTheme, ThemeTokens as TextfieldThemeTokens} from '@atlaskit/textfield';
    `,
    `
    ${importToDoComment}
    import Textfield from '@atlaskit/textfield';
  `,
    'should remove theme imports with alias name from Textfield and leave a comment',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import { TextFieldProps, ThemeProps, Theme, ThemeTokens } from '@atlaskit/textfield';
    `,
    `
    ${importToDoComment}
    import { TextFieldProps } from '@atlaskit/textfield';
    `,
    'should remove theme imports & leave other imports from Textfield and leave a comment',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import { ThemeProps, ThemeTokens, Theme } from '@atlaskit/textfield';
    `,
    `
    ${importToDoComment}
    `,
    'should remove theme imports & remove whole line if no default import from Textfield and leave a comment',
  );
});
