import { API, FileInfo, Options } from 'jscodeshift';
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

import mapActionsProp from '../motions/map-actions-prop';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  mapActionsProp(j, source);

  return source.toSource(options.printOptions);
}

describe('map actions prop to components', () => {
  describe('for default & named imports', () => {
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
        />
      );
      `,
      'should map actions correctly',
    );

    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
      import React from "react";
      import SectionMessage, { SectionMessageProps } from "@atlaskit/section-message";

      export default () => (
        <SectionMessage
          actions={[
            { text: 'Action 1', key: '1', testId: 'one' },
            { text: 'Action 2', key: '2' },
            { text: 'Action 3', key: '3' },
            { text: 'Action 4', key: '4' },
          ]}
        />
      );
      `,
      `
      import React from "react";
      import SectionMessage, { SectionMessageProps, SectionMessageAction } from "@atlaskit/section-message";

      export default () => (
        <SectionMessage
          actions={[
            { text: 'Action 1', key: '1', testId: 'one' },
            { text: 'Action 2', key: '2' },
            { text: 'Action 3', key: '3' },
            { text: 'Action 4', key: '4' },
          ].map((
            {
              text,
              ...restAction
            }
          ) => <SectionMessageAction {...restAction}>{text}</SectionMessageAction>)}
        />
      );
      `,
      'should map actions correctly if defined inline',
    );

    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
      import React from "react";
      import SectionMessage, { SectionMessageProps } from "@atlaskit/section-message";

      const SectionMessageAction = () => {};

      const actions = [
        { text: 'Action 1', key: '1', testId: 'one' },
        { text: 'Action 2', key: '2' },
        { text: 'Action 3', key: '3' },
        { text: 'Action 4', key: '4' },
      ];

      const Component = () => (
        <SectionMessage
          actions={actions}
        />
      );

      export default Component;
      `,
      `
      import React from "react";
      import SectionMessage, { SectionMessageProps, SectionMessageAction as AtlaskitSectionMessageAction } from "@atlaskit/section-message";

      const SectionMessageAction = () => {};

      const actions = [
        { text: 'Action 1', key: '1', testId: 'one' },
        { text: 'Action 2', key: '2' },
        { text: 'Action 3', key: '3' },
        { text: 'Action 4', key: '4' },
      ];

      const Component = () => (
        <SectionMessage
          actions={actions.map((
            {
              text,
              ...restAction
            }
          ) => <AtlaskitSectionMessageAction {...restAction}>{text}</AtlaskitSectionMessageAction>)}
        />
      );

      export default Component;
      `,
      'should map actions correctly - with alias',
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
        <SectionMessage />
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
        <SectionMessage />
      );
      `,
      'should only map when "actions" prop is defined',
    );

    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
      import React from "react";
      import SectionMessage from "@atlaskit/section-message";

      const getActions = () => [
        { text: 'Action 1', key: '1', testId: 'one' },
        { text: 'Action 2', key: '2' },
        { text: 'Action 3', key: '3' },
        { text: 'Action 4', key: '4' },
      ];

      export default () => (
        <SectionMessage
          actions={getActions()}
        />
      );
      `,
      `
      import React from "react";
      import SectionMessage, { SectionMessageAction } from "@atlaskit/section-message";

      const getActions = () => [
        { text: 'Action 1', key: '1', testId: 'one' },
        { text: 'Action 2', key: '2' },
        { text: 'Action 3', key: '3' },
        { text: 'Action 4', key: '4' },
      ];

      export default () => (
        <SectionMessage
          actions={getActions().map((
            {
              text,
              ...restAction
            }
          ) => <SectionMessageAction {...restAction}>{text}</SectionMessageAction>)}
        />
      );
      `,
      'should map actions correctly if result coming from a function call',
    );

    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
      import React from "react";
      import SectionMessage, { SectionMessageProps } from "@atlaskit/section-message";

      export default () => (
        <SectionMessage
          actions={true ? [
            { text: 'Action 1', key: '1', testId: 'one' },
            { text: 'Action 2', key: '2' },
            { text: 'Action 3', key: '3' },
            { text: 'Action 4', key: '4' },
          ]: []}
        />
      );
      `,
      `
      import React from "react";
      import SectionMessage, { SectionMessageProps, SectionMessageAction } from "@atlaskit/section-message";

      export default () => (
        <SectionMessage
          actions={(true ? [
            { text: 'Action 1', key: '1', testId: 'one' },
            { text: 'Action 2', key: '2' },
            { text: 'Action 3', key: '3' },
            { text: 'Action 4', key: '4' },
          ] : []).map((
            {
              text,
              ...restAction
            }
          ) => <SectionMessageAction {...restAction}>{text}</SectionMessageAction>)}
        />
      );
      `,
      'should map actions correctly if defined inline based on a condition',
    );

    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
      import React from "react";
      import SectionMessage, { SectionMessageProps } from "@atlaskit/section-message";

      const CustomLink = () => <a></a>;

      export default () => (
        <SectionMessage
          linkComponent={CustomLink}
          actions={[
            { text: 'Action 1', key: '1', testId: 'one' },
            { text: 'Action 2', key: '2' },
            { text: 'Action 3', key: '3' },
            { text: 'Action 4', key: '4' },
          ]}
        />
      );
      `,
      `
      import React from "react";
      import SectionMessage, { SectionMessageProps, SectionMessageAction } from "@atlaskit/section-message";

      const CustomLink = () => <a></a>;

      export default () => (
        <SectionMessage
          actions={[
            { text: 'Action 1', key: '1', testId: 'one' },
            { text: 'Action 2', key: '2' },
            { text: 'Action 3', key: '3' },
            { text: 'Action 4', key: '4' },
          ].map((
            {
              text,
              ...restAction
            }
          ) => <SectionMessageAction linkComponent={CustomLink} {...restAction}>{text}</SectionMessageAction>)} />
      );
      `,
      'should move "linkComponent" from "SectionMessage" to "SectionMessageAction" if pointing to a component',
    );

    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
      import React from "react";
      import SectionMessage, { SectionMessageProps } from "@atlaskit/section-message";

      export default () => (
        <SectionMessage
          linkComponent={() => <a></a>}
          actions={[
            { text: 'Action 1', key: '1', testId: 'one' },
            { text: 'Action 2', key: '2' },
            { text: 'Action 3', key: '3' },
            { text: 'Action 4', key: '4' },
          ]}
        />
      );
      `,
      `
      import React from "react";
      import SectionMessage, { SectionMessageProps, SectionMessageAction } from "@atlaskit/section-message";

      export default () => (
        <SectionMessage
          actions={[
            { text: 'Action 1', key: '1', testId: 'one' },
            { text: 'Action 2', key: '2' },
            { text: 'Action 3', key: '3' },
            { text: 'Action 4', key: '4' },
          ].map((
            {
              text,
              ...restAction
            }
          ) => <SectionMessageAction linkComponent={() => <a></a>} {...restAction}>{text}</SectionMessageAction>)} />
      );
      `,
      'should move "linkComponent" from "SectionMessage" to "SectionMessageAction" if component is defined inline',
    );

    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
      import React from "react";
      import SectionMessage, { SectionMessageProps } from "@atlaskit/section-message";

      const CustomLink = () => <a></a>;

      export default () => (
        <SectionMessage
          linkComponent={CustomLink}
        />
      );
      `,
      `
      import React from "react";
      import SectionMessage, { SectionMessageProps } from "@atlaskit/section-message";

      const CustomLink = () => <a></a>;

      export default () => (
        <SectionMessage />
      );
      `,
      'should remove "linkComponent" from "SectionMessage" if no actions are present',
    );
  });

  describe('for dynamic imports', () => {
    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
      import React from "react";

      const SectionMessageDynamicImport = React.lazy(() => import('@atlaskit/section-message'));

      const actions = [
        { text: 'Action 1', key: '1', testId: 'one' },
        { text: 'Action 2', key: '2' },
        { text: 'Action 3', key: '3' },
        { text: 'Action 4', key: '4' },
      ];

      export default () => (
        <SectionMessageDynamicImport
          actions={actions}
        />
      );
      `,
      `
      import React from "react";

      const SectionMessageDynamicImport = React.lazy(() => import('@atlaskit/section-message'));

      /* TODO: (@codeshift) We have added \`React.lazy\` here. Feel free to change it to \`lazy\` or other named import depending upon how you imported. */
      const SectionMessageAction = React.lazy(() => import("@atlaskit/section-message/section-message-action"));

      const actions = [
        { text: 'Action 1', key: '1', testId: 'one' },
        { text: 'Action 2', key: '2' },
        { text: 'Action 3', key: '3' },
        { text: 'Action 4', key: '4' },
      ];

      export default () => (
        <SectionMessageDynamicImport
          actions={actions.map((
            {
              text,
              ...restAction
            }
          ) => <SectionMessageAction {...restAction}>{text}</SectionMessageAction>)}
        />
      );
      `,
      'should map actions correctly',
    );

    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
      import React from "react";

      const SectionMessageDynamicImport = React.lazy(() => import('@atlaskit/section-message'));

      export default () => (
        <SectionMessageDynamicImport
          actions={[
            { text: 'Action 1', key: '1', testId: 'one' },
            { text: 'Action 2', key: '2' },
            { text: 'Action 3', key: '3' },
            { text: 'Action 4', key: '4' },
          ]}
        />
      );
      `,
      `
      import React from "react";

      const SectionMessageDynamicImport = React.lazy(() => import('@atlaskit/section-message'));

      /* TODO: (@codeshift) We have added \`React.lazy\` here. Feel free to change it to \`lazy\` or other named import depending upon how you imported. */
      const SectionMessageAction = React.lazy(() => import("@atlaskit/section-message/section-message-action"));

      export default () => (
        <SectionMessageDynamicImport
          actions={[
            { text: 'Action 1', key: '1', testId: 'one' },
            { text: 'Action 2', key: '2' },
            { text: 'Action 3', key: '3' },
            { text: 'Action 4', key: '4' },
          ].map((
            {
              text,
              ...restAction
            }
          ) => <SectionMessageAction {...restAction}>{text}</SectionMessageAction>)}
        />
      );
      `,
      'should map actions correctly if defined inline',
    );

    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
      import React from "react";

      const SectionMessageDynamicImport = React.lazy(() => import('@atlaskit/section-message'));

      const SectionMessageAction = () => {};

      const actions = [
        { text: 'Action 1', key: '1', testId: 'one' },
        { text: 'Action 2', key: '2' },
        { text: 'Action 3', key: '3' },
        { text: 'Action 4', key: '4' },
      ];

      const Component = () => (
        <SectionMessageDynamicImport
          actions={actions}
        />
      );

      export default Component;
      `,
      `
      import React from "react";

      const SectionMessageDynamicImport = React.lazy(() => import('@atlaskit/section-message'));

      /* TODO: (@codeshift) We have added \`React.lazy\` here. Feel free to change it to \`lazy\` or other named import depending upon how you imported. */
      const AtlaskitSectionMessageAction = React.lazy(() => import("@atlaskit/section-message/section-message-action"));

      const SectionMessageAction = () => {};

      const actions = [
        { text: 'Action 1', key: '1', testId: 'one' },
        { text: 'Action 2', key: '2' },
        { text: 'Action 3', key: '3' },
        { text: 'Action 4', key: '4' },
      ];

      const Component = () => (
        <SectionMessageDynamicImport
          actions={actions.map((
            {
              text,
              ...restAction
            }
          ) => <AtlaskitSectionMessageAction {...restAction}>{text}</AtlaskitSectionMessageAction>)}
        />
      );

      export default Component;
      `,
      'should map actions correctly - with alias',
    );

    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
      import React from "react";

      const SectionMessageDynamicImport = React.lazy(() => import('@atlaskit/section-message'));

      const actions = [
        { text: 'Action 1', key: '1', testId: 'one' },
        { text: 'Action 2', key: '2' },
        { text: 'Action 3', key: '3' },
        { text: 'Action 4', key: '4' },
      ];

      export default () => (
        <SectionMessageDynamicImport />
      );
      `,
      `
      import React from "react";

      const SectionMessageDynamicImport = React.lazy(() => import('@atlaskit/section-message'));

      const actions = [
        { text: 'Action 1', key: '1', testId: 'one' },
        { text: 'Action 2', key: '2' },
        { text: 'Action 3', key: '3' },
        { text: 'Action 4', key: '4' },
      ];

      export default () => (
        <SectionMessageDynamicImport />
      );
      `,
      'should only map when "actions" prop is defined',
    );
  });
});
