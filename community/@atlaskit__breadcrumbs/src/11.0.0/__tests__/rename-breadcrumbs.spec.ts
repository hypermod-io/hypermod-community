import { applyTransform } from '@hypermod/utils';
import { API, FileInfo, Options } from 'jscodeshift';
import renameBreadcrumbs from '../motions/rename-breadcrumbs';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  renameBreadcrumbs(j, source);

  return source.toSource(options.printOptions);
}

describe('@atlaskit/breadcrumbs@11.0.0 motion: Rename BreadcrumbsStateless to Breadcrumbs', () => {
  it('rename BreadcrumbsStateless to Breadcrumbs and do not change named Imports', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import BreadcrumbsStateless, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";

      export default () => (
        <BreadcrumbsStateless size="large" isExpanded />
      );
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from 'react';
            import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";

            export default () => (
              <Breadcrumbs size="large" isExpanded />
            );"
    `);
  });

  it('change BreadcrumbsStateless to DSBreadcrumbs when name get conflict', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import Breadcrumbs from '@material-ui/Breadcrumbs';
      import BreadcrumbsStateless from "@atlaskit/breadcrumbs";

      export default () => (
        <BreadcrumbsStateless size="large" isExpanded />
      );
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from 'react';
            import Breadcrumbs from '@material-ui/Breadcrumbs';
            import DSBreadcrumbs from "@atlaskit/breadcrumbs";

            export default () => (
              <DSBreadcrumbs size="large" isExpanded />
            );"
    `);
  });

  it('change BreadcrumbsStateless to Breadcrumbs imports and usages', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import BreadcrumbsStateless from "@atlaskit/breadcrumbs";

      export default () => (
        <>
          <section>
            <BreadcrumbsStateless size="large" isExpanded />
          </section>
          <section>
            <BreadcrumbsStateless size="large" isExpanded  />
          </section>
        </>
      );
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from 'react'; import Breadcrumbs from "@atlaskit/breadcrumbs";
      export default () => (
      <>
        <section>
          <Breadcrumbs size="large" isExpanded />
        </section>
        <section>
          <Breadcrumbs size="large" isExpanded />
        </section>
        </>);
    `);
  });
});
