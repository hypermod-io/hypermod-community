import { applyTransform } from '@hypermod/utils';

import transformer from '../transform';

describe('@atlaskit/textarea@4.0.0 transform', () => {
  it('should apply 1 migrates', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React, { useRef } from "react";
      import TextArea from "@atlaskit/textarea";
      const ref = useRef(null);
      export default () => <TextArea defaultValue="test" forwardedRef={ref}/>;
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React, { useRef } from "react"; import TextArea from "@atlaskit/textarea";
      const ref = useRef(null); export default () =>
      <TextArea defaultValue="test"
      ref={ref}/>;
    `);
  });

  it('should not rename forwardedRef if it is not provided', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from "react";
      import TextArea from "@atlaskit/textarea";
      export default () => <TextArea defaultValue="test"/>;
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from "react"; import TextArea from "@atlaskit/textarea";
      export default () =>
      <TextArea defaultValue="test" />;
    `);
  });

  it('should rename forwardedRef to ref', async () => {
    const result = await applyTransform(
      transformer,
      `
    import React from "react";
    import TextArea from "@atlaskit/textarea";

    const ref = React.createRef<HTMLTextAreaElement>();
    export default () => <TextArea defaultValue="test" forwardedRef={ref} />;
  `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from "react"; import TextArea from "@atlaskit/textarea";
      const ref = React.createRef
      <HTMLTextAreaElement>(); export default () =>
        <TextArea defaultValue="test" ref={ref} />;
    `);
  });

  it('should rename forwardedRef to ref with alias', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from "react";
      import SmartTextArea from "@atlaskit/textarea";

      const ref = React.createRef<HTMLTextAreaElement>();
      export default () => <SmartTextArea defaultValue="test" forwardedRef={ref} />;
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
            import SmartTextArea from "@atlaskit/textarea";

            const ref = React.createRef<HTMLTextAreaElement>();
            export default () => <SmartTextArea defaultValue="test" ref={ref} />;"
    `);
  });

  it('should rename forwardedRef to ref when using ref via useRef', async () => {
    const result = await applyTransform(
      transformer,
      `
        import React from "react";
        import TextArea from "@atlaskit/textarea";

        const ref = useRef<HTMLTextAreaElement>(null);
        export default () => <TextArea defaultValue="test" forwardedRef={ref} />;
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from "react"; import TextArea from "@atlaskit/textarea";
      const ref = useRef
      <HTMLTextAreaElement>(null); export default () =>
        <TextArea defaultValue="test" ref={ref} />;
    `);
  });
});
