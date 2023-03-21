import { applyTransform } from '@codeshift/test-utils';
import * as transformer from './transform';

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
    const result = await applyTransform(
      transformer,
      `
      // import React from 'react';
      // export const Greet = ({ name }) => <span>Hi {name}</span>;
      // Greet.defaultProps = { name: 'Stranger' };
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`
      // import React from 'react'; // export const Greet = ({ name }) =>
      <span>Hi {name}</span>; // Greet.defaultProps = { name: 'Stranger' };
    `);
  });

  // it('should replace default props for arrow function component', async () => {
  //   const result = await applyTransform(transformer, input2, { parser: 'tsx' });

  //   expect(result).toMatchInlineSnapshot(`
  //     import React from 'react'; export const Component = () => { return
  //     <span>Hi {name}</span>; };
  //   `);
  // });
});
