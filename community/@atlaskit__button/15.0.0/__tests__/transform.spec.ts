import { API, FileInfo, Options } from 'jscodeshift';
import transformer from '../transform';

const applyTransform = require('jscodeshift/dist/testUtils').applyTransform;

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

describe('@atlaskit/button@15.0.0 transform', () => {
  describe('Change `type ButtonAppearances` to `type Appearance`', () => {
    check({
      transformer,
      it: 'should separate types into a different export from the components',
      original: `
        import Button, { ButtonAppearances } from "@atlaskit/button";

        export type Mine = ButtonAppearances & 'purple';

        function App() {
          return (
            <Button onClick={() => console.log('hi')}>click me</Button>
          );
        }
      `,
      expected: `
        import { Appearance } from "@atlaskit/button/types";
        import Button from "@atlaskit/button/custom-theme-button";

        export type Mine = Appearance & 'purple';

        function App() {
          return (
            <Button onClick={() => console.log('hi')}>click me</Button>
          );
        }
      `,
    });
  });

  describe('Changing <Button /> usage', () => {
    check({
      transformer,
      it: 'should move to custom theme button',
      original: `
        import React from "react";
        import Button from "@atlaskit/button";
        function App() {
          return (
            <Button onClick={() => console.log('hi')}>click me</Button>
          );
        }
      `,
      expected: `
        import React from "react";
        import Button from "@atlaskit/button/custom-theme-button";
        function App() {
          return (
            <Button onClick={() => console.log('hi')}>click me</Button>
          );
        }
    `,
    });
    check({
      transformer,
      it: 'should move over when not used in JSX',
      original: `
        import React from "react";
        import Button from "@atlaskit/button";
        expect(Button).toBeTruthy();
      `,
      expected: `
        import React from "react";
        import Button from "@atlaskit/button/custom-theme-button";
        expect(Button).toBeTruthy();
    `,
    });
    check({
      transformer,
      it: 'should respect self closing tags',
      original: `
        import React from "react";
        import Button from "@atlaskit/button";
        function App() {
          return <Button onClick={() => console.log('hi')} />;
        }
      `,
      expected: `
        import React from "react";
        import Button from "@atlaskit/button/custom-theme-button";
        function App() {
          return <Button onClick={() => console.log('hi')} />;
        }
    `,
    });
    check({
      transformer,
      it: 'should respect the existing alias',
      original: `
        import React from "react";
        import Button from "./our-button";
        import AkButton from "@atlaskit/button";
        export function App() {
          return (
            <>
              <Button onClick={() => console.log('hi')} />
              <AkButton onClick={() => console.log('hi')} />
            </>
          );
        }
      `,
      expected: `
        import React from "react";
        import Button from "./our-button";
        import AkButton from "@atlaskit/button/custom-theme-button";
        export function App() {
          return (
            <>
              <Button onClick={() => console.log('hi')} />
              <AkButton onClick={() => console.log('hi')} />
            </>
          );
        }
    `,
    });
  });

  describe('`type ButtonProps` to `type CustomButtonProps`', () => {
    check({
      transformer,
      it: 'should move to the new type',
      original: `
        import React from "react";
        import Button, { ButtonProps } from "@atlaskit/button";

        function App() {
          return <Button>click me</Button>;
        }
      `,
      expected: `
        import React from "react";
        import { CustomThemeButtonProps } from "@atlaskit/button/types";
        import Button from "@atlaskit/button/custom-theme-button";

        function App() {
          return <Button>click me</Button>;
        }
    `,
    });

    check({
      transformer,
      it: 'should respect aliasing',
      original: `
        import React from "react";
        import Button, { ButtonProps as Foo } from "@atlaskit/button";

        export type Bar = Foo & { name: string };

        function App() {
          return <Button>click me</Button>;
        }
      `,
      expected: `
        import React from "react";
        import { CustomThemeButtonProps as Foo } from "@atlaskit/button/types";
        import Button from "@atlaskit/button/custom-theme-button";

        export type Bar = Foo & { name: string };

        function App() {
          return <Button>click me</Button>;
        }
    `,
    });

    check({
      transformer,
      it: 'should avoid clashes',
      original: `
        import React from "react";
        import { CustomThemeButtonProps } from "./my-types";
        import Button, { ButtonProps } from "@atlaskit/button";

        export type Bar = CustomThemeButtonProps & ButtonProps & { name: string };

        function App() {
          return <Button>click me</Button>;
        }
      `,
      expected: `
        import React from "react";
        import { CustomThemeButtonProps } from "./my-types";
        import { CustomThemeButtonProps as DSCustomThemeButtonProps } from "@atlaskit/button/types";
        import Button from "@atlaskit/button/custom-theme-button";

        export type Bar = CustomThemeButtonProps & DSCustomThemeButtonProps & { name: string };

        function App() {
          return <Button>click me</Button>;
        }
    `,
    });

    check({
      transformer,
      it: 'should move from type entry point',
      original: `
      import React from "react";
      import { ButtonProps } from "@atlaskit/button/types";
    `,
      expected: `
      import React from "react";
      import { CustomThemeButtonProps } from "@atlaskit/button/types";
    `,
    });
  });
});
