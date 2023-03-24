import { applyTransform } from '@codeshift/test-utils';
import * as transformer from './transform';

describe('react#remove-default-props transform', () => {
  // describe('components with function declaration', () => {
  //   it('should move default props to function declaration when there no existing props', async () => {
  //     const result = await applyTransform(
  //       transformer,
  //       `
  //   import React from 'react';
  //   export function Greet(){ <span>Hi {name}</span>; }
  //   Greet.defaultProps = { name: 'Stranger' };
  //         `,
  //       { parser: 'tsx' },
  //     );
  //     expect(result).toMatchInlineSnapshot(`
  //       import React from 'react'; export function Greet( { name: name = "Stranger"
  //       } ) {
  //       <span>Hi {name}</span>; }
  //     `);
  //   });
  //   it('should remove default props and move them to intended place preserving other props', async () => {
  //     const result = await applyTransform(
  //       transformer,
  //       `
  //   import React from 'react';
  //   export function Greet({text}){ <span>Hi {name} {text}</span>; }
  //   Greet.defaultProps = { name: 'Stranger' };
  //         `,
  //       { parser: 'tsx' },
  //     );
  //     expect(result).toMatchInlineSnapshot(`
  //         import React from 'react'; export function Greet( { text: text, name:
  //         name = "Stranger" } ) {
  //         <span>Hi {name} {text}</span>; }
  //       `);
  //   });

  //   it('should remove default props and move them to intended place preserving other props even with destructured renamed props', async () => {
  //     const result = await applyTransform(
  //       transformer,
  //       `
  // import React from 'react';
  // export function Greet({text:myText}){ <span>Hi {name} {text}</span>; }
  // Greet.defaultProps = { name: 'Stranger' };
  //       `,
  //       { parser: 'tsx' },
  //     );
  //     expect(result).toMatchInlineSnapshot(`
  //     import React from 'react'; export function Greet( { text: myText, name:
  //     name = "Stranger" } ) {
  //     <span>Hi {name} {text}</span>; }
  //   `);
  //   });

  //   it('preserves default values for destructured components', async () => {
  //     const result = await applyTransform(
  //       transformer,
  //       `
  // import React from 'react';
  // export function Greet({text:myText, props='amazingText'}){ <span>Hi {name} {text}</span>; }
  // Greet.defaultProps = { name: 'Stranger' };
  //       `,
  //       { parser: 'tsx' },
  //     );
  //     expect(result).toMatchInlineSnapshot(`
  //     import React from 'react'; export function Greet( { text: myText, props:
  //     props='amazingText', name: name = "Stranger" } ) {
  //     <span>Hi {name} {text}</span>; }
  //   `);
  //   });

  //   it(' with rest pworksarameters', async () => {
  //     const result = await applyTransform(
  //       transformer,
  //       `
  // import React from 'react';
  // export function Greet({prop1,...someRest}){ <span>Hi {name} {text}</span>; }
  // Greet.defaultProps = { name: 'Stranger' };
  //       `,
  //       { parser: 'tsx' },
  //     );
  //     expect(result).toMatchInlineSnapshot(`
  //     import React from 'react'; export function Greet( { prop1: prop1, name:
  //     name = "Stranger", ...someRest } ) {
  //     <span>Hi {name} {text}</span>; }
  //   `);
  //   });

  //   it('works with any props parameter passed', async () => {
  //     const result = await applyTransform(
  //       transformer,
  //       `
  // import React from 'react';
  // export function Greet(props){ <span>Hi {name} {text}</span>; }
  // Greet.defaultProps = { name: 'Stranger' };
  //       `,
  //       { parser: 'tsx' },
  //     );
  //     expect(result).toMatchInlineSnapshot(`
  //     import React from 'react'; export function Greet( { ...props, name: name
  //     = "Stranger" } ) {
  //     <span>Hi {name} {text}</span>; }
  //   `);
  //   });
  // });

  describe('components with as arrow functions', () => {
    it('should remove default props', async () => {
      expect(
        await applyTransform(
          transformer,
          `
  import React from 'react';
  export const Greet = ({ name }) => <span>Hi {name}</span>;
  Greet.defaultProps = { text: 'Stranger' };
        `,
          { parser: 'tsx' },
        ),
      ).toMatchInlineSnapshot(`
        "import React from 'react';
          export const Greet = (
            {
              text: text = \\"Stranger\\"
            }
          ) => {};"
      `);
    });
  });
});
