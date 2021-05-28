const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

import transformer from '../transform';

describe('@atlaskit/textarea@4.0.0 transform', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React, { useRef } from "react";
      import TextArea from "@atlaskit/textarea";
      const ref = useRef(null);
      export default () => <TextArea defaultValue="test" forwardedRef={ref}/>;
    `,
    `
      import React, { useRef } from "react";
      import TextArea from "@atlaskit/textarea";
      const ref = useRef(null);
      export default () => <TextArea defaultValue="test" ref={ref}/>;
    `,
    'should apply 1 migrates',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import TextArea from "@atlaskit/textarea";
      export default () => <TextArea defaultValue="test"/>;
    `,
    `
      import React from "react";
      import TextArea from "@atlaskit/textarea";
      export default () => <TextArea defaultValue="test"/>;
    `,
    'should not rename forwardedRef if it is not provided',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from "react";
    import TextArea from "@atlaskit/textarea";

    const ref = React.createRef<HTMLTextAreaElement>();
    export default () => <TextArea defaultValue="test" forwardedRef={ref} />;
  `,
    `
    import React from "react";
    import TextArea from "@atlaskit/textarea";

    const ref = React.createRef<HTMLTextAreaElement>();
    export default () => <TextArea defaultValue="test" ref={ref} />;
  `,
    'should rename forwardedRef to ref',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import SmartTextArea from "@atlaskit/textarea";

      const ref = React.createRef<HTMLTextAreaElement>();
      export default () => <SmartTextArea defaultValue="test" forwardedRef={ref} />;
    `,
    `
      import React from "react";
      import SmartTextArea from "@atlaskit/textarea";

      const ref = React.createRef<HTMLTextAreaElement>();
      export default () => <SmartTextArea defaultValue="test" ref={ref} />;
    `,
    'should rename forwardedRef to ref with alias',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import TextArea from "@atlaskit/textarea";

      const ref = useRef<HTMLTextAreaElement>(null);
      export default () => <TextArea defaultValue="test" forwardedRef={ref} />;
    `,
    `
      import React from "react";
      import TextArea from "@atlaskit/textarea";

      const ref = useRef<HTMLTextAreaElement>(null);
      export default () => <TextArea defaultValue="test" ref={ref} />;
    `,
    'should rename forwardedRef to ref when using ref via useRef',
  );
});
