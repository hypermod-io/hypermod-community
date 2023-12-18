import { applyTransform } from '@hypermod/utils';
import transformer from '../transform';

describe('@atlaskit/breadcrumbs@11.0.0 transform', () => {
  it('should delete hasSeparator when found it', async () => {
    const result = await applyTransform(
      transformer,
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
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
            import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";

            export default () => (
            <Breadcrumbs testId="BreadcrumbsTestId">
              <BreadcrumbsItem href="/page" text="item 1" />
              <BreadcrumbsItem href="/page" text="item 2" />
            </Breadcrumbs>
            );"
    `);
  });
  it('should rename BreadcrumbsStateless when found it', async () => {
    const result = await applyTransform(
      transformer,
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
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
            import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";

            export default () => (
            <Breadcrumbs testId="BreadcrumbsTestId">
              <BreadcrumbsItem href="/page" text="item 1" />
              <BreadcrumbsItem href="/page" text="item 2" />
            </Breadcrumbs>
            );"
    `);
  });
  it('should elevate and rename BreadcrumbsStateless when alias is used', async () => {
    const result = await applyTransform(
      transformer,
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
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
              import BCControlled, { BreadcrumbsItem as Item } from "@atlaskit/breadcrumbs";

              export default () => (
              <BCControlled testId="BreadcrumbsTestId">
                <Item href="/page" text="item 1"/>
                <Item href="/page" text="item 2"/>
              </BCControlled>
              );"
    `);
  });
  it('should rename BreadcrumbsStateless and delete hasSeparator when found it', async () => {
    const result = await applyTransform(
      transformer,
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
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from "react";
              import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";

              export default () => (
              <Breadcrumbs testId="BreadcrumbsTestId">
                <BreadcrumbsItem href="/page" text="item 1" />
                <BreadcrumbsItem href="/page" text="item 2" />
              </Breadcrumbs>
              );"
    `);
  });
});
