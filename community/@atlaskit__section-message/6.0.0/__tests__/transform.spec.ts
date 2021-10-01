const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
import transformer from '../transform';

describe('@atlaskit/section-message@6.0.0 transform', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from "react";
    import SectionMessage from "@atlaskit/section-message";

    const actions = [
      { text: 'Action 1', key: '1', testId: 'one' },
      { text: 'Action 2', key: '2' },
      { text: 'Action 3', key: '3' },
      { text: 'Action 4', key: '4' },
    ];

    export default () => (
      <SectionMessage
        appearance="confirmation"
        actions={actions}
      />
    );
    `,
    `
    import React from "react";
    import SectionMessage, { SectionMessageAction } from "@atlaskit/section-message";

    const actions = [
      { text: 'Action 1', key: '1', testId: 'one' },
      { text: 'Action 2', key: '2' },
      { text: 'Action 3', key: '3' },
      { text: 'Action 4', key: '4' },
    ];

    export default () => (
      <SectionMessage
        appearance="success"
        actions={actions.map((
          {
            text,
            ...restAction
          }
        ) => <SectionMessageAction {...restAction}>{text}</SectionMessageAction>)}
      />
    );
    `,
    'should transform both appearance and actions prop',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from "react";
    import SectionMessage from "@atlaskit/section-message";

    const actions = [
      { text: 'Action 1', key: '1', testId: 'one' },
      { text: 'Action 2', key: '2' },
      { text: 'Action 3', key: '3' },
      { text: 'Action 4', key: '4' },
    ];

    export default () => (
      <SectionMessage
        actions={actions}
        appearance="info"
      />
    );
    `,
    `
    import React from "react";
    import SectionMessage, { SectionMessageAction } from "@atlaskit/section-message";

    const actions = [
      { text: 'Action 1', key: '1', testId: 'one' },
      { text: 'Action 2', key: '2' },
      { text: 'Action 3', key: '3' },
      { text: 'Action 4', key: '4' },
    ];

    export default () => (
      <SectionMessage
        actions={actions.map((
          {
            text,
            ...restAction
          }
        ) => <SectionMessageAction {...restAction}>{text}</SectionMessageAction>)}
        appearance="information"
      />
    );
    `,
    'should transform both appearance and actions prop when arranged in different order',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from "react";
    import SectionMessage from "@atlaskit/section-message";

    const actions = [
      { text: 'Action 1', key: '1', testId: 'one' },
      { text: 'Action 2', key: '2' },
      { text: 'Action 3', key: '3' },
      { text: 'Action 4', key: '4' },
    ];

    export default () => (
      <SectionMessage
        actions={actions}
        title="hello"
        appearance="info"
      />
    );
    `,
    `
    import React from "react";
    import SectionMessage, { SectionMessageAction } from "@atlaskit/section-message";

    const actions = [
      { text: 'Action 1', key: '1', testId: 'one' },
      { text: 'Action 2', key: '2' },
      { text: 'Action 3', key: '3' },
      { text: 'Action 4', key: '4' },
    ];

    export default () => (
      <SectionMessage
        actions={actions.map((
          {
            text,
            ...restAction
          }
        ) => <SectionMessageAction {...restAction}>{text}</SectionMessageAction>)}
        title="hello"
        appearance="information"
      />
    );
    `,
    'should transform both appearance and actions prop when a prop is in between them',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from "react";
    import SectionMessage from "@atlaskit/section-message";

    const actions = [
      { text: 'Action 1', key: '1', testId: 'one' },
      { text: 'Action 2', key: '2' },
      { text: 'Action 3', key: '3' },
      { text: 'Action 4', key: '4' },
    ];

    export default () => (
      <SectionMessage
        title="hello"
        appearance="info"
      />
    );
    `,
    `
    import React from "react";
    import SectionMessage from "@atlaskit/section-message";

    const actions = [
      { text: 'Action 1', key: '1', testId: 'one' },
      { text: 'Action 2', key: '2' },
      { text: 'Action 3', key: '3' },
      { text: 'Action 4', key: '4' },
    ];

    export default () => (
      <SectionMessage
        title="hello"
        appearance="information"
      />
    );
    `,
    'should transform only appearance prop',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from "react";
    import SectionMessage from "@atlaskit/section-message";

    const actions = [
      { text: 'Action 1', key: '1', testId: 'one' },
      { text: 'Action 2', key: '2' },
      { text: 'Action 3', key: '3' },
      { text: 'Action 4', key: '4' },
    ];

    export default () => (
      <SectionMessage
        actions={actions}
        title="hello"
      />
    );
    `,
    `
    import React from "react";
    import SectionMessage, { SectionMessageAction } from "@atlaskit/section-message";

    const actions = [
      { text: 'Action 1', key: '1', testId: 'one' },
      { text: 'Action 2', key: '2' },
      { text: 'Action 3', key: '3' },
      { text: 'Action 4', key: '4' },
    ];

    export default () => (
      <SectionMessage
        actions={actions.map((
          {
            text,
            ...restAction
          }
        ) => <SectionMessageAction {...restAction}>{text}</SectionMessageAction>)}
        title="hello"
      />
    );
    `,
    'should transform only actions prop',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from "react";
    import SectionMessage from "@atlaskit/section-message";

    const actions = [
      { text: 'Action 1', key: '1', testId: 'one' },
      { text: 'Action 2', key: '2' },
      { text: 'Action 3', key: '3' },
      { text: 'Action 4', key: '4' },
    ];

    const CustomLink = <a>hello</a>;

    export default () => (
      <SectionMessage
        actions={actions}
        linkComponent={CustomLink}
        title="hello"
        appearance="info"
      />
    );
    `,
    `
    import React from "react";
    import SectionMessage, { SectionMessageAction } from "@atlaskit/section-message";

    const actions = [
      { text: 'Action 1', key: '1', testId: 'one' },
      { text: 'Action 2', key: '2' },
      { text: 'Action 3', key: '3' },
      { text: 'Action 4', key: '4' },
    ];

    const CustomLink = <a>hello</a>;

    export default () => (
      <SectionMessage
        actions={actions.map((
          {
            text,
            ...restAction
          }
        ) => <SectionMessageAction linkComponent={CustomLink} {...restAction}>{text}</SectionMessageAction>)}
        title="hello"
        appearance="information" />
    );
    `,
    'should transform both appearance and actions prop and move linkComponent to "SectionMessageAction"',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from "react";
    import SectionMessage from "@atlaskit/section-message";

    const CustomLink = <a>hello</a>;

    export default () => (
      <SectionMessage
        linkComponent={CustomLink}
        title="hello"
        appearance="info"
      />
    );
    `,
    `
    import React from "react";
    import SectionMessage from "@atlaskit/section-message";

    const CustomLink = <a>hello</a>;

    export default () => (
      <SectionMessage title="hello" appearance="information" />
    );
    `,
    'should transform appearance prop and remove linkComponent prop if no actions prop is present',
  );
});
