import { API, FileInfo, Options } from 'jscodeshift';
const applyTransform = require('jscodeshift/dist/testUtils').applyTransform;

import transformer from '../transform';

interface TestArgs {
  it: string;
  original: string;
  expected: string;
  transformer: (file: FileInfo, jscodeshift: API, options: Options) => void;
  mode?: 'only' | 'skip' | 'standard';
  before?: () => void;
  after?: () => void;
}

export function check({
  it: name,
  original,
  expected,
  transformer,
  before = () => {},
  after = () => {},
  mode = 'standard',
}: TestArgs) {
  const run = mode === 'only' ? it.only : mode === 'skip' ? it.skip : it;

  run(name, () => {
    before();
    try {
      const output = applyTransform(
        { default: transformer, parser: 'tsx' },
        {},
        { source: original },
      );
      expect(output).toBe(expected.trim());
    } catch (e) {
      // a failed assertion will throw
      after();
      throw e;
    }
    // will only be hit if we don't throw
    after();
  });
}

describe('@atlaskit/button@15.1.1 transform', () => {
  check({
    transformer,
    it: 'should rename data-testid to testId (default import)',
    original: `
    import DSButton from '@atlaskit/button';

    function App() {
      return <DSButton data-testid="my-testid">click me</DSButton>;
    }
  `,
    expected: `
    import DSButton from '@atlaskit/button';

    function App() {
      return <DSButton testId="my-testid">click me</DSButton>;
    }
  `,
  });

  check({
    transformer,
    it: 'should rename data-testid to testId (standard button)',
    original: `
    import Button from '@atlaskit/button/standard-button';

    function App() {
      return <Button data-testid="my-testid">click me</Button>;
    }
  `,
    expected: `
    import Button from '@atlaskit/button/standard-button';

    function App() {
      return <Button testId="my-testid">click me</Button>;
    }
  `,
  });

  check({
    transformer,
    it: 'should rename data-testid to testId (loading button)',
    original: `
    import Button from '@atlaskit/button/loading-button';

    function App() {
      return <Button data-testid="my-testid">click me</Button>;
    }
  `,
    expected: `
    import Button from '@atlaskit/button/loading-button';

    function App() {
      return <Button testId="my-testid">click me</Button>;
    }
  `,
  });

  check({
    transformer,
    it: 'should rename data-testid to testId (custom theme button)',
    original: `
    import Button from '@atlaskit/button/custom-theme-button';

    function App() {
      return <Button data-testid="my-testid">click me</Button>;
    }
  `,
    expected: `
    import Button from '@atlaskit/button/custom-theme-button';

    function App() {
      return <Button testId="my-testid">click me</Button>;
    }
  `,
  });

  check({
    transformer,
    it: 'should rename data-testid to testId (named imports)',
    original: `
    import { StandardButton, LoadingButton, CustomThemeButton } from '@atlaskit/button';

    function App() {
      return <>
        <StandardButton data-testid="my-testid">click me</StandardButton>
        <LoadingButton data-testid="my-testid">click me</LoadingButton>
        <CustomThemeButton data-testid="my-testid">click me</CustomThemeButton>
      </>;
    }
  `,
    expected: `
    import { StandardButton, LoadingButton, CustomThemeButton } from '@atlaskit/button';

    function App() {
      return <>
        <StandardButton testId="my-testid">click me</StandardButton>
        <LoadingButton testId="my-testid">click me</LoadingButton>
        <CustomThemeButton testId="my-testid">click me</CustomThemeButton>
      </>;
    }
  `,
  });

  check({
    transformer,
    it: 'should rename data-testid to testId (named imports with alias)',
    original: `
    import { StandardButton as SB, LoadingButton as LB, CustomThemeButton as CTB } from '@atlaskit/button';

    function App() {
      return <>
        <SB data-testid="my-testid">click me</SB>
        <LB data-testid="my-testid">click me</LB>
        <CTB data-testid="my-testid">click me</CTB>
      </>;
    }
  `,
    expected: `
    import { StandardButton as SB, LoadingButton as LB, CustomThemeButton as CTB } from '@atlaskit/button';

    function App() {
      return <>
        <SB testId="my-testid">click me</SB>
        <LB testId="my-testid">click me</LB>
        <CTB testId="my-testid">click me</CTB>
      </>;
    }
  `,
  });

  check({
    transformer,
    it: 'should add a warning when both the testId and data-testid props are being used',
    original: `
    import StandardButton from '@atlaskit/button';

    function App() {
      return <StandardButton testId="oh-my" data-testid="oh-dear">Click me</StandardButton>
    }
  `,
    expected: `
    /* TODO: (@hypermod) Cannot rename data-testid to testId on StandardButton.
    A StandardButton was detected with both data-testid and testId props.
    Please remove the data-testid prop and check your tests */
    import StandardButton from '@atlaskit/button';

    function App() {
      return <StandardButton testId="oh-my" data-testid="oh-dear">Click me</StandardButton>
    }
  `,
  });

  check({
    transformer,
    it: 'should not touch unrelated testids',
    original: `
    import DSButton from '@atlaskit/button';
    import Something from '@atlaskit/foobar';

    function App() {
      return <>
        <DSButton data-testid="my-testid">
          <Something data-testid="hello">click me</Something>
        </DSButton>
      </>;
    }
  `,
    expected: `
    import DSButton from '@atlaskit/button';
    import Something from '@atlaskit/foobar';

    function App() {
      return <>
        <DSButton testId="my-testid">
          <Something data-testid="hello">click me</Something>
        </DSButton>
      </>;
    }
  `,
  });
});
