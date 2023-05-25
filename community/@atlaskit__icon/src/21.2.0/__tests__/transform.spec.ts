const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

import transformer from '../transform';

describe('@atlaskit/icon@21.2.0 transform', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import { metadata } from '@atlaskit/icon';
      console.log(metadata);
    `,
    `
      import metadata from "@atlaskit/icon/metadata";
      console.log(metadata);
    `,
    'should replace named metadata import from main entry point with default import from dedicated entry point',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import { metadata as data } from '@atlaskit/icon';
      console.log(data);
    `,
    `
      import data from "@atlaskit/icon/metadata";
      console.log(data);
    `,
    'should preserve renaming when converting from named import to default import',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import { a, metadata, b } from '@atlaskit/icon';
      console.log(metadata);
    `,
    `
      import metadata from "@atlaskit/icon/metadata";
      import { a, b } from '@atlaskit/icon';
      console.log(metadata);
    `,
    'should preserve other named imports',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import { a, metadata as data, b } from '@atlaskit/icon';
      console.log(data);
    `,
    `
      import data from "@atlaskit/icon/metadata";
      import { a, b } from '@atlaskit/icon';
      console.log(data);
    `,
    'should preserve other named imports, as well as metadata renaming',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import Icon, { a, metadata as data, b } from '@atlaskit/icon';
      console.log(a, data, b);
    `,
    `
      import data from "@atlaskit/icon/metadata";
      import Icon, { a, b } from '@atlaskit/icon';
      console.log(a, data, b);
    `,
    'should preserve other named imports and default import, as well as metadata renaming',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import metadata from "@atlaskit/icon/metadata";
      console.log(metadata);
    `,
    `
      import metadata from "@atlaskit/icon/metadata";
      console.log(metadata);
    `,
    'should not affect existing good imports',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import { metadata } from 'not-@atlaskit/icon';
    `,
    `
      import { metadata } from 'not-@atlaskit/icon';
    `,
    'should not affect other packages',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import { metadata } from '@atlaskit/icon/foo';
    `,
    `
      import { metadata } from '@atlaskit/icon/foo';
    `,
    'should not affect other entrypoints',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import { metadata } from '@atlaskit/icon';
      import { metadata as objectIconMetadata } from '@atlaskit/icon-object';
      import { metadata as fileTypeIconMetadata } from '@atlaskit/icon-file-type';
      import { metadata as priorityIconMetadata } from '@atlaskit/icon-priority';
    `,
    `
      import metadata from "@atlaskit/icon/metadata";
      import { metadata as objectIconMetadata } from '@atlaskit/icon-object';
      import { metadata as fileTypeIconMetadata } from '@atlaskit/icon-file-type';
      import { metadata as priorityIconMetadata } from '@atlaskit/icon-priority';
    `,
    'should work as expected on a real-world case',
  );
});
