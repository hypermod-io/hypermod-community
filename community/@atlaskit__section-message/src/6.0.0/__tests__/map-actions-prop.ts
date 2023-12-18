import { applyTransform } from '@hypermod/utils';
import { API, FileInfo, Options } from 'jscodeshift';

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
    it('should map actions correctly', async () => {
      const result = await applyTransform(
        transformer,
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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
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
      `);
    });

    it('should map actions correctly if defined inline', async () => {
      const result = await applyTransform(
        transformer,
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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
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
      `);
    });

    it('should map actions correctly - with alias', async () => {
      const result = await applyTransform(
        transformer,
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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
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
      `);
    });

    it('should only map when "actions" prop is defined', async () => {
      const result = await applyTransform(
        transformer,
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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
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
      `);
    });

    it('should map actions correctly if result coming from a function call', async () => {
      const result = await applyTransform(
        transformer,
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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
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
        `);
    });

    it('should map actions correctly if defined inline based on a condition', async () => {
      const result = await applyTransform(
        transformer,
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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
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
        `);
    });

    it('should move "linkComponent" from "SectionMessage" to "SectionMessageAction" if pointing to a component', async () => {
      const result = await applyTransform(
        transformer,
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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
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
        `);
    });

    it('should move "linkComponent" from "SectionMessage" to "SectionMessageAction" if component is defined inline', async () => {
      const result = await applyTransform(
        transformer,
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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
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
        `);
    });

    it('should remove "linkComponent" from "SectionMessage" if no actions are present', async () => {
      const result = await applyTransform(
        transformer,
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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
        import React from "react";
        import SectionMessage, { SectionMessageProps } from "@atlaskit/section-message";

        const CustomLink = () => <a></a>;

        export default () => (
          <SectionMessage />
        );
        `);
    });
  });

  describe('for dynamic imports', () => {
    it('should map actions correctly', async () => {
      const result = await applyTransform(
        transformer,
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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
      import React from "react";

      const SectionMessageDynamicImport = React.lazy(() => import('@atlaskit/section-message'));

      /* TODO: (@hypermod) We have added \`React.lazy\` here. Feel free to change it to \`lazy\` or other named import depending upon how you imported. */
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
      `);
    });

    it('should map actions correctly if defined inline', async () => {
      const result = await applyTransform(
        transformer,
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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
      import React from "react";

      const SectionMessageDynamicImport = React.lazy(() => import('@atlaskit/section-message'));

      /* TODO: (@hypermod) We have added \`React.lazy\` here. Feel free to change it to \`lazy\` or other named import depending upon how you imported. */
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
      `);
    });

    it('should map actions correctly - with alias', async () => {
      const result = await applyTransform(
        transformer,
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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
      import React from "react";

      const SectionMessageDynamicImport = React.lazy(() => import('@atlaskit/section-message'));

      /* TODO: (@hypermod) We have added \`React.lazy\` here. Feel free to change it to \`lazy\` or other named import depending upon how you imported. */
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
      `);
    });

    it('should only map when "actions" prop is defined', async () => {
      const result = await applyTransform(
        transformer,
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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
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
      `);
    });
  });
});
