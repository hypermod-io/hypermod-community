import { applyTransform } from '@codeshift/test-utils';
import * as transformer from './transform';

describe('@emotion@11.0.0 transform', () => {
  it('should transform imports correctly', async () => {
    const result = await applyTransform(
      transformer,
      `
        import * as core from '@emotion/core';
        import * as emotion from 'emotion';
        import * as emotionTheming from 'emotion-theming';
        import * as emotionServer from 'emotion-server';
        import * as createEmotion from 'create-emotion';
        import * as createEmotionServer from 'create-emotion-server';
        import * as babelPlugin from 'babel-plugin-emotion';
        import * as eslintPlugin from 'eslint-plugin-emotion';
        import * as jestEmotion from 'jest-emotion';
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`
      "import * as core from "@emotion/react";
              import * as emotion from "@emotion/css";
              import * as emotionTheming from "@emotion/react";
              import * as emotionServer from "@emotion/server";
              import * as createEmotion from "@emotion/css/create-instance";
              import * as createEmotionServer from "@emotion/server/create-instance";
              import * as babelPlugin from "@emotion/babel-plugin";
              import * as eslintPlugin from "@emotion/eslint-plugin";
              import * as jestEmotion from "@emotion/jest";"
    `);
  });
});
