import { applyTransform } from '@hypermod/utils';
import transformer from '../transform';

describe('@atlaskit/toggle@11.0.0 transform', () => {
  it('should not transform if imports are not present', async () => {
    const result = await applyTransform(
      transformer,
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
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from "react"; import { X as Toggle } from "x"; () => { return
      (
      <div>
        <Toggle isDefaultChecked={true} />
      </div>); };
    `);
  });

  it('transforms `isDefaultChecked` to `defaultChecked` when `@atlaskit/toggle` is imported', async () => {
    const result = await applyTransform(
      transformer,
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
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from "react"; import Toggle from "@atlaskit/toggle"; () =>
      { return ( (
      <div>
        <Toggle defaultChecked={true} />
      </div>) ); };
    `);
  });

  it('transforms `isDefaultChecked` to `defaultChecked` when `@atlaskit/toggle` is imported - without changing the value', async () => {
    const result = await applyTransform(
      transformer,
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
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from "react"; import Toggle from "@atlaskit/toggle"; () =>
      { return ( (
      <div>
        <Toggle defaultChecked={false} />
      </div>) ); };
    `);
  });

  it('transforms `isDefaultChecked` to `defaultChecked` when `@atlaskit/toggle` is imported', async () => {
    const result = await applyTransform(
      transformer,
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
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from "react"; import Toggle from "@atlaskit/toggle"; () =>
      { const T = Toggle; const X = Toggle; const Z = Toggle; const FOO = "bar";
      return ( (
      <div>
        <Toggle defaultChecked={true} />
        <T defaultChecked={true} />
        <X id={true} />
        <Z defaultChecked={true} />
      </div>) ); };
    `);
  });
});
