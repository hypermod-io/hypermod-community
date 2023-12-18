import { applyTransform } from '@hypermod/utils';
import { API, FileInfo, Options } from 'jscodeshift';
import elevateStatelessToDefault from '../motions/elevate-stateless-to-default';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  elevateStatelessToDefault(j, source);

  return source.toSource(options.printOptions);
}

describe('@atlaskit/breadcrumbs@11.0.0 motion: Elevate BreadcrumbsStateless', () => {
  it('nothing would change if Breadcrumbs is used', async () => {
    const result = await applyTransform(
      transformer,
      `
    import React from 'react';
    import Breadcrumbs from "@atlaskit/breadcrumbs";

    export default () => (
      <Breadcrumbs testId="BreadcrumbsTestId" />
    );
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from 'react';
          import Breadcrumbs from "@atlaskit/breadcrumbs";

          export default () => (
            <Breadcrumbs testId="BreadcrumbsTestId" />
          );"
    `);
  });

  it('elevate  BreadcrumbsStateless to default import and do not change other named imports', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import { BreadcrumbsStateless, BreadcrumbsItem} from "@atlaskit/breadcrumbs";

      export default () => (
        <BreadcrumbsStateless testId="BreadcrumbsTestId" />
      );
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from 'react';
            import BreadcrumbsStateless, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";

            export default () => (
              <BreadcrumbsStateless testId="BreadcrumbsTestId" />
            );"
    `);
  });

  it('elevate to new BCStateless default import when BreadcrumbsStateless has alias', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import { BreadcrumbsStateless as BCStateless, BreadcrumbsItem as Item} from "@atlaskit/breadcrumbs";
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from 'react';
            import BCStateless, { BreadcrumbsItem as Item } from "@atlaskit/breadcrumbs";"
    `);
  });

  it('change to new Breadcrumbs when BreadcrumbsStateless is used with alias', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import { BreadcrumbsStateless as Breadcrumbs } from "@atlaskit/breadcrumbs";

      export default () => (
        <Breadcrumbs testId="BreadcrumbsTestId" />
      );
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from 'react';
            import Breadcrumbs from "@atlaskit/breadcrumbs";

            export default () => (
              <Breadcrumbs testId="BreadcrumbsTestId" />
            );"
    `);
  });
});
