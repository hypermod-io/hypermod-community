import transformer from '../transform';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

describe('@atlaskit/breadcrumbs@11.0.0 transform', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";

      export default () => (
      <Breadcrumbs testId="BreadcrumbsTestId">
        <BreadcrumbsItem href="/page" text="item 1" hasSeparator />
        <BreadcrumbsItem href="/page" text="item 2" hasSeparator={false} />
      </Breadcrumbs>
      );
    `,
    `
      import React from "react";
      import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";

      export default () => (
      <Breadcrumbs testId="BreadcrumbsTestId">
        <BreadcrumbsItem href="/page" text="item 1" />
        <BreadcrumbsItem href="/page" text="item 2" />
      </Breadcrumbs>
      );
    `,
    'should delete hasSeparator when found it',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import { BreadcrumbsStateless, BreadcrumbsItem } from "@atlaskit/breadcrumbs";

      export default () => (
      <BreadcrumbsStateless testId="BreadcrumbsTestId">
        <BreadcrumbsItem href="/page" text="item 1" hasSeparator />
        <BreadcrumbsItem href="/page" text="item 2" hasSeparator={false} />
      </BreadcrumbsStateless>
      );
    `,
    `
      import React from "react";
      import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";

      export default () => (
      <Breadcrumbs testId="BreadcrumbsTestId">
        <BreadcrumbsItem href="/page" text="item 1" />
        <BreadcrumbsItem href="/page" text="item 2" />
      </Breadcrumbs>
      );
    `,
    'should rename BreadcrumbsStateless when found it',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import { BreadcrumbsStateless as BCControlled, BreadcrumbsItem as Item } from "@atlaskit/breadcrumbs";

      export default () => (
      <BCControlled testId="BreadcrumbsTestId">
        <Item href="/page" text="item 1"/>
        <Item href="/page" text="item 2"/>
      </BCControlled>
      );
    `,
    `
      import React from "react";
      import BCControlled, { BreadcrumbsItem as Item } from "@atlaskit/breadcrumbs";

      export default () => (
      <BCControlled testId="BreadcrumbsTestId">
        <Item href="/page" text="item 1"/>
        <Item href="/page" text="item 2"/>
      </BCControlled>
      );
    `,
    'should elevate and rename BreadcrumbsStateless when alias is used',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import { BreadcrumbsStateless, BreadcrumbsItem } from "@atlaskit/breadcrumbs";

      export default () => (
      <BreadcrumbsStateless testId="BreadcrumbsTestId">
        <BreadcrumbsItem href="/page" text="item 1" hasSeparator />
        <BreadcrumbsItem href="/page" text="item 2" hasSeparator={false} />
      </BreadcrumbsStateless>
      );
    `,
    `
      import React from "react";
      import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";

      export default () => (
      <Breadcrumbs testId="BreadcrumbsTestId">
        <BreadcrumbsItem href="/page" text="item 1" />
        <BreadcrumbsItem href="/page" text="item 2" />
      </Breadcrumbs>
      );
    `,
    'should rename BreadcrumbsStateless and delete hasSeparator when found it',
  );
});
