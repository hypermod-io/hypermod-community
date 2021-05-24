import { API, FileInfo, Options } from 'jscodeshift';
import renameBreadcrumbs from './rename-breadcrumbs';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  renameBreadcrumbs(j, source);

  return source.toSource(options.printOptions);
}

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

describe('@atlaskit/breadcrumbs@11.0.0 motion: Rename BreadcrumbsStateless to Breadcrumbs', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from 'react';
    import BreadcrumbsStateless, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";

    export default () => (
      <BreadcrumbsStateless size="large" isExpanded />
    );
    `,
    `
    import React from 'react';
    import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";

    export default () => (
      <Breadcrumbs size="large" isExpanded />
    );
    `,
    'rename BreadcrumbsStateless to Breadcrumbs and do not change named Imports',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from 'react';
    import Breadcrumbs from '@material-ui/Breadcrumbs';
    import BreadcrumbsStateless from "@atlaskit/breadcrumbs";

    export default () => (
      <BreadcrumbsStateless size="large" isExpanded />
    );
    `,
    `
    import React from 'react';
    import Breadcrumbs from '@material-ui/Breadcrumbs';
    import DSBreadcrumbs from "@atlaskit/breadcrumbs";

    export default () => (
      <DSBreadcrumbs size="large" isExpanded />
    );
    `,
    'change BreadcrumbsStateless to DSBreadcrumbs when name get conflict',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
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
    `
    import React from 'react';
    import Breadcrumbs from "@atlaskit/breadcrumbs";

    export default () => (
      <>
        <section>
          <Breadcrumbs size="large" isExpanded />
        </section>
        <section>
          <Breadcrumbs size="large" isExpanded  />
        </section>
      </>
    );
    `,
    'change BreadcrumbsStateless to Breadcrumbs imports and usages',
  );
});
