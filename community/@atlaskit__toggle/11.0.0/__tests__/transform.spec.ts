import transformer from '../transform';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

describe('@atlaskit/toggle@11.0.0 transform', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from "react";
    import { X as Toggle } from "x";
    () => {
      return (
        <div>
          <Toggle isDefaultChecked={true} />
        </div>
      );
    };
    `,
    `
    import React from "react";
    import { X as Toggle } from "x";
    () => {
      return (
        <div>
          <Toggle isDefaultChecked={true} />
        </div>
      );
    };
    `,
    'should not transform if imports are not present',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from "react";
    import Toggle from "@atlaskit/toggle";
    () => {
      return (
        <div>
          <Toggle isDefaultChecked={true} />
        </div>
      );
    };
    `,
    `
    import React from "react";
    import Toggle from "@atlaskit/toggle";
    () => {
      return (
        <div>
          <Toggle defaultChecked={true} />
        </div>
      );
    };
    `,
    'transforms `isDefaultChecked` to `defaultChecked` when `@atlaskit/toggle` is imported',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from "react";
    import Toggle from "@atlaskit/toggle";
    () => {
      return (
        <div>
          <Toggle isDefaultChecked={false} />
        </div>
      );
    };
    `,
    `
    import React from "react";
    import Toggle from "@atlaskit/toggle";
    () => {
      return (
        <div>
          <Toggle defaultChecked={false} />
        </div>
      );
    };
    `,
    'transforms `isDefaultChecked` to `defaultChecked` when `@atlaskit/toggle` is imported - without changing the value',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from "react";
    import Toggle from "@atlaskit/toggle";
    () => {
      const T = Toggle;
      const X = Toggle;
      const Z = Toggle;

      const FOO = "bar";
      return (
        <div>
          <Toggle isDefaultChecked={true} />
          <T isDefaultChecked={true} />
          <X id={true} />
          <Z isDefaultChecked={true} />
        </div>
      );
    };
    `,
    `
    import React from "react";
    import Toggle from "@atlaskit/toggle";
    () => {
      const T = Toggle;
      const X = Toggle;
      const Z = Toggle;

      const FOO = "bar";
      return (
        <div>
          <Toggle defaultChecked={true} />
          <T defaultChecked={true} />
          <X id={true} />
          <Z defaultChecked={true} />
        </div>
      );
    };
    `,
    'transforms `isDefaultChecked` to `defaultChecked` when `@atlaskit/toggle` is imported',
  );
});
