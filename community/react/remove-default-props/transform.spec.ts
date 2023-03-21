import { applyTransform } from '@codeshift/test-utils';
import * as transformer from './transform';
import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.resolve(__dirname, 'input.tsx'), 'utf8');
const input2 = fs.readFileSync(path.resolve(__dirname, 'input2.tsx'), 'utf8');

describe('react#remove-default-props transform', () => {
  //   it('should remove default props', async () => {
  //     const result = await applyTransform(
  //       transformer,
  //       `
  // import React from 'react';

  // export const Greet = ({ name }) => <span>Hi {name}</span>;
  // Greet.defaultProps = { name: 'Stranger' };
  //       `,
  //       { parser: 'tsx' },
  //     );

  //     expect(result).toMatchInlineSnapshot(`
  //       import React from 'react'; export const Greet = ({ name }) =>
  //       <span>Hi {name}</span>;
  //     `);
  //   });

  it('should replace default props for function component', async () => {
    const result = await applyTransform(transformer, input, { parser: 'tsx' });

    expect(result).toMatchInlineSnapshot(`
      import React from 'react'; export function Component( { name: name = "Oleg"
      } ) { return
      <span>Hi {name}</span>; }
    `);
  });

  it('should replace default props for arrow function component', async () => {
    const result = await applyTransform(transformer, input2, { parser: 'tsx' });

    expect(result).toMatchInlineSnapshot(`
      import React from 'react'; export const Component = () => { return
      <span>Hi {name}</span>; };
    `);
  });
});
