const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
import transformer from '../transform';

describe('@atlaskit/range@4.0.0 transform', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
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
    `
      import React, { useRef } from 'react';
      import Range from '@atlaskit/range';

      const SimpleRange = () => {
        let ref = useRef();

        const inputRef = (newRef) => {
          ref = newRef;
        }
        return <Range ref={inputRef} />;
      }
    `,
    'should replace inputRef with ref',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
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
    `
      import React, { useRef } from 'react';
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
      }
    `,
    'should replace inputRef with ref when defined inline',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
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
    `
      import React, { useRef } from 'react';
      import Foo from '@atlaskit/range';

      const SimpleRange = () => {
        let ref = useRef();

        const inputRef = (newRef) => {
          ref = newRef;
        }
        return <Foo ref={inputRef} />;
      }
    `,
    'should change inputRef with aliased import name',
  );
});
