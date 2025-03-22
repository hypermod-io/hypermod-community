import { RuleTester } from 'eslint';

import rule from '../rules/no-codemod-comment';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('no-codemod-comment', rule, {
  valid: [
    {
      code: [
        // This has an invalid header so is ignored
        `/* integrity: codemod-hash-1399692252 */`,
        `// TODO codemod-generated-comment signed: codemod-hash-1399692252`,
        `<Hello />`,
      ].join('\n'),
    },
    {
      code: [`<Hello />`].join('\n'),
    },
  ],
  invalid: [
    {
      code: [
        `/* AUTOGENERATED CODEMOD SIGNATURE signed: */`,
        `// TODO: This is a codemod generated comment.`,
        `<Hello>`,
        `  <AKModal open={false} />`,
        `</Hello>`,
      ].join('\n'),
      errors: [{ messageId: 'noHashMatch' }],
    },
    {
      code: [
        `/* AUTOGENERATED CODEMOD SIGNATURE signed: codemod-hash-1510141432 */`,
        `// TODO: This is a codemod generated comment.`,
        `<Hello />`,
      ].join('\n'),
      errors: [{ messageId: 'noHashMatch' }],
    },
    {
      code: [
        `/* AUTOGENERATED CODEMOD SIGNATURE signed: codemod-hash-524539434,codemod-hash-2056612822 */`,
        `// TODO: This is a codemod generated comment.`,
        `const y = <Hello />`,
        `// TODO: This is a codemod generated comment. Another comment`,
        `const x = <Hello />`,
      ].join('\n'),
      errors: [{ messageId: 'noHashInSource' }, { messageId: 'noHashMatch' }],
    },
    {
      code: [
        `/* AUTOGENERATED CODEMOD SIGNATURE signed: codemod-hash-524539434,codemod-hash-2056612820 */`,
        `// TODO: This is a codemod generated comment.`,
        `const y = <Hello />`,
        `// TODO: This is a codemod generated comment. Another comment`,
        `const x = <Hello />`,
      ].join('\n'),
      errors: [
        { messageId: 'noHashInSource' },
        { messageId: 'noHashInSource' },
      ],
    },
  ],
});
