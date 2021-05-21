import { API, FileInfo, Options } from 'jscodeshift';
import { removeHasSeparator } from './remove-hasSeparator';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  removeHasSeparator(j, source);

  return source.toSource(options.printOptions);
}

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

describe('@atlaskit/breadcrumbs@11.0.0 motion: delete hasSeparator prop', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
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
    'should change nothing when hasSeparator is not used ',
  );

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
      import Breadcrumbs, {BreadcrumbsItem as Item} from "@atlaskit/breadcrumbs";

      export default () => (
      <Breadcrumbs testId="BreadcrumbsTestId">
        <Item href="/page" text="item 1" hasSeparator />
        <Item href="/page" text="item 2" hasSeparator={false} />
      </Breadcrumbs>
      );
    `,
    `
      import React from "react";
      import Breadcrumbs, {BreadcrumbsItem as Item} from "@atlaskit/breadcrumbs";

      export default () => (
      <Breadcrumbs testId="BreadcrumbsTestId">
        <Item href="/page" text="item 1" />
        <Item href="/page" text="item 2" />
      </Breadcrumbs>
      );
    `,
    'should delete hasSeparator when found it - named import',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import Breadcrumbs from "@atlaskit/breadcrumbs";
      import BreadcrumbsItem from "@facebook/breadcrumbs";

      export default () => (
      <Breadcrumbs testId="BreadcrumbsTestId">
        <BreadcrumbsItem href="/page" text="item 1" hasSeparator />
        <BreadcrumbsItem href="/page" text="item 2" hasSeparator={false} />
      </Breadcrumbs>
      );
    `,
    `
      import React from "react";
      import Breadcrumbs from "@atlaskit/breadcrumbs";
      import BreadcrumbsItem from "@facebook/breadcrumbs";

      export default () => (
      <Breadcrumbs testId="BreadcrumbsTestId">
        <BreadcrumbsItem href="/page" text="item 1" hasSeparator />
        <BreadcrumbsItem href="/page" text="item 2" hasSeparator={false} />
      </Breadcrumbs>
      );
    `,
    'should not delete hasSeparator when they come from other library',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";

      const props = {
        hasSeparator: true,
      };

      export default () => (
      <Breadcrumbs testId="BreadcrumbsTestId">
        <BreadcrumbsItem href="/page" text="item 1" {...props} />
      </Breadcrumbs>
      );
    `,
    `
      /* TODO: (@codeshift) This file uses the @atlaskit/breadcrumbs \`hasSeparator\` prop which
      has now been removed due to its poor performance characteristics. From version 11.0.0, we changed to
      \`css\` pseudo element for the separator and consumer should not use hasSeparator directly anymore. */
      import React from "react";
      import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";

      const props = {
        hasSeparator: true,
      };

      export default () => (
      <Breadcrumbs testId="BreadcrumbsTestId">
        <BreadcrumbsItem href="/page" text="item 1" {...props} />
      </Breadcrumbs>
      );
    `,
    'should add comments when using spreading',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from "react";
      import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";

      const props = {
        hasSeparator: true,
      };

      export default () => (
      <Breadcrumbs testId="BreadcrumbsTestId">
        <BreadcrumbsItem href="/page" text="item 1" {...props} />
        <BreadcrumbsItem href="/page" text="item 2" hasSeparator />
        <BreadcrumbsItem href="/page" text="item 3" hasSeparator={false} />
      </Breadcrumbs>
      );
    `,
    `
      /* TODO: (@codeshift) This file uses the @atlaskit/breadcrumbs \`hasSeparator\` prop which
      has now been removed due to its poor performance characteristics. From version 11.0.0, we changed to
      \`css\` pseudo element for the separator and consumer should not use hasSeparator directly anymore. */
      import React from "react";
      import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";

      const props = {
        hasSeparator: true,
      };

      export default () => (
      <Breadcrumbs testId="BreadcrumbsTestId">
        <BreadcrumbsItem href="/page" text="item 1" {...props} />
        <BreadcrumbsItem href="/page" text="item 2" />
        <BreadcrumbsItem href="/page" text="item 3" />
      </Breadcrumbs>
      );
    `,
    'should add comments when using spreading with multiple instances',
  );
});
