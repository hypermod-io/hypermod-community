import { applyTransform } from '@hypermod/utils';
import transformer from '../transform';

describe('@atlaskit/range@4.0.0 transform', () => {
  it('should replace inputRef with ref', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React, { useRef } from 'react';
      import Range from '@atlaskit/range';

      const SimpleRange = () => {
        let ref = useRef();

        const inputRef = (newRef) => {
          ref = newRef;
        }
        return <Range inputRef={inputRef} />;
      }
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React, { useRef } from 'react';
            import Range from '@atlaskit/range';

            const SimpleRange = () => {
              let ref = useRef();

              const inputRef = (newRef) => {
                ref = newRef;
              }
              return <Range ref={inputRef} />;
            }"
    `);
  });

  it('should replace inputRef with ref when defined inline', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React, { useRef } from 'react';
      import Range from '@atlaskit/range';

      const SimpleRange = () => {
        let ref = useRef();

        return (
          <Range
            inputRef={newRef => {
              ref = newRef;
            }}
          />
        );
      }
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React, { useRef } from 'react';
            import Range from '@atlaskit/range';

            const SimpleRange = () => {
              let ref = useRef();

              return (
                <Range
                  ref={newRef => {
                    ref = newRef;
                  }}
                />
              );
            }"
    `);
  });

  it('should change inputRef with aliased import name', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React, { useRef } from 'react';
      import Foo from '@atlaskit/range';

      const SimpleRange = () => {
        let ref = useRef();

        const inputRef = (newRef) => {
          ref = newRef;
        }
        return <Foo inputRef={inputRef} />;
      }
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React, { useRef } from 'react';
            import Foo from '@atlaskit/range';

            const SimpleRange = () => {
              let ref = useRef();

              const inputRef = (newRef) => {
                ref = newRef;
              }
              return <Foo ref={inputRef} />;
            }"
    `);
  });
});
