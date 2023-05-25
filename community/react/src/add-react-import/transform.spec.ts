import { applyTransform } from '@codeshift/test-utils';
import * as transformer from './transform';

describe('react#add-react-import transform', () => {
  it('insert react import when JSX is used', async () => {
    const result = await applyTransform(
      transformer,
      `export const Component = () => <div />`,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from "react"; export const Component = () =>
      <div />
    `);
  });
});
