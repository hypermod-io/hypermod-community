import transformer from '../transform';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

interface TestArgs {
  name: string;
  original: string;
  expected: string;
}
function check({ name, original, expected }: TestArgs) {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    original,
    expected,
    name,
  );
}

describe('@atlaskit/spinner@13.0.0 transform', () => {
  describe('Change `type SpinnerSizes` to `type Size`', () => {
    check({
      name: 'it should rename SpinnerSizes type to Size',
      original: `
      import Spinner, { SpinnerSizes } from '@atlaskit/spinner';

      const value: SpinnerSizes = 'large';
    `,
      expected: `
      import Spinner, { Size } from '@atlaskit/spinner';

      const value: Size = 'large';
    `,
    });

    check({
      name: 'it should rename SpinnerSizes type to Size and not impact alias values',
      original: `
      import Spinner, { SpinnerSizes as MySize } from '@atlaskit/spinner'
      import { Size, SpinnerSizes } from './some-other-file';

      const value: MySize = 'large';
      const value1: Size = 1;
      const value2: SpinnerSizes = 1;
    `,
      // the file is mostly untouched except for the spinner import
      expected: `
      import Spinner, { Size as MySize } from '@atlaskit/spinner'
      import { Size, SpinnerSizes } from './some-other-file';

      const value: MySize = 'large';
      const value1: Size = 1;
      const value2: SpinnerSizes = 1;
    `,
    });
  });

  describe('Changing <Spinner/> usage', () => {
    check({
      name: 'it should remove onComplete and isCompleting props',
      original: `
    import React, {useState} from 'react';
    import Spinner from '@atlaskit/spinner';

    function App() {
      const [isCompleting] = useState(false);
      const onComplete = () => {};
      return (
        <Spinner
          isCompleting={isCompleting}
          onComplete={() => {
            console.log('on complete!');
            onComplete();
          }}
          delay={1000}
        />
      );
    }
  `,
      expected: `
    import React, {useState} from 'react';
    import Spinner from '@atlaskit/spinner';

    function App() {
      const [isCompleting] = useState(false);
      const onComplete = () => {};
      return (<Spinner delay={1000} />);
    }
  `,
    });

    check({
      name: 'it should respect custom component names',
      original: `
    import React from 'react';
    import CustomName from '@atlaskit/spinner';

    return <CustomName delay={10} />;
  `,
      expected: `
    import React from 'react';
    import CustomName from '@atlaskit/spinner';

    return <CustomName />;
  `,
    });

    check({
      name: 'it should not touch unrelated packages with the same component name',
      original: `
    import React from 'react';
    import Spinner from '../my-cool-spinner';

    return <Spinner delay={100} />;
  `,
      expected: `
    import React from 'react';
    import Spinner from '../my-cool-spinner';

    return <Spinner delay={100} />;
  `,
    });

    check({
      name: 'it should remove small delays',
      original: `
    import React from 'react';
    import Spinner from '@atlaskit/spinner';
    import myValue from './my-value'

    return (
      <>
        <Spinner delay={0} />
        <Spinner delay={100} />
        <Spinner delay={150} />
        <Spinner delay={151} />
        <Spinner delay={myValue} />
      </>
    );
  `,
      expected: `
    import React from 'react';
    import Spinner from '@atlaskit/spinner';
    import myValue from './my-value'

    return (
      <>
        <Spinner />
        <Spinner />
        <Spinner />
        <Spinner delay={151} />
        <Spinner delay={myValue} />
      </>
    );
  `,
    });

    check({
      name: 'it should shift the invertColor prop',
      original: `
    import React from 'react';
    import Spinner from '@atlaskit/spinner';
    import value from './value';


    return (
      <>
        <Spinner />
        <Spinner invertColor />
        <Spinner invertColor={false} />
        <Spinner invertColor={true} />
        <Spinner invertColor={value} />
      </>
    );
  `,
      expected: `
    import React from 'react';
    import Spinner from '@atlaskit/spinner';
    import value from './value';


    return (
      <>
        <Spinner />
        <Spinner appearance="invert" />
        <Spinner />
        <Spinner appearance="invert" />
        <Spinner appearance={value ? "invert" : "inherit"} />
      </>
    );
  `,
    });
  });
});
