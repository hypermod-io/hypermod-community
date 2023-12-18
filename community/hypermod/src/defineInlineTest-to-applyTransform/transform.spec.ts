import { applyTransform } from '@hypermod/utils';
import * as transformer from './transform';

describe('hypermod#defineInlineTest-to-applyTransform transform', () => {
  it('should transform defineInlineTest to applyTransform wrapped in it function', async () => {
    const inputCode = `
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
defineInlineTest(
  { default: transformer, parser: 'tsx' },
  {},
  'input code',
  'output code',
  'test description'
);`;

    const expectedOutput = `import { applyTransform } from "@hypermod/utils";
it('test description', async () => {
  const result = await applyTransform(transformer, 'input code', {
    parser: 'tsx'
  });

  expect(result).toMatchInlineSnapshot('output code');
});`;

    const result = await applyTransform(transformer, inputCode, {
      parser: 'tsx',
    });

    expect(result).toBe(expectedOutput.trim());
  });

  it('should not transform unrelated code', async () => {
    const inputCode = `console.log('hello world');`;
    const result = await applyTransform(transformer, inputCode, {
      parser: 'tsx',
    });

    expect(result).toBe(inputCode);
  });

  it('should be idempotent', async () => {
    const inputCode = `
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
defineInlineTest(
  { default: transformer, parser: 'tsx' },
  {},
  'input code',
  'output code',
  'test description'
);`;

    const expectedOutput = `import { applyTransform } from "@hypermod/utils";
it('test description', async () => {
  const result = await applyTransform(transformer, 'input code', {
    parser: 'tsx'
  });

  expect(result).toMatchInlineSnapshot('output code');
});`;

    const firstPass = await applyTransform(transformer, inputCode, {
      parser: 'tsx',
    });

    expect(firstPass).toBe(expectedOutput);

    const secondPass = await applyTransform(transformer, firstPass, {
      parser: 'tsx',
    });
    expect(secondPass).toBe(firstPass);
  });
});
