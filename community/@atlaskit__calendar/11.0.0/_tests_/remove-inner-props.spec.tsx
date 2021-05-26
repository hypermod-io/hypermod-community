import { API, FileInfo, Options } from 'jscodeshift';
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

import removeInnerProps from '../motions/remove-inner-props';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  removeInnerProps(j, source);

  return source.toSource(options.printOptions);
}

describe('Remove innerProps', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from 'react';
    import Calendar from '@atlaskit/calendar';

    const SimpleCalendar = () => {
      return (
        <Calendar
          innerProps={{
            style: {
              border: '1px solid red',
              display: 'inline-block',
            },
          }}
        />
      );
    }
  `,
    `
    /* TODO: (@codeshift) This file uses the @atlaskit/calendar \`innerProps\` which
    has now been removed due to its poor performance characteristics. Codemod
    has auto flattened 'className' & 'style' properties inside it if present as a standalone props to calendar.
    Rest other properties if any inside innerProps will get auto-removed along with it,
    & might have to be handled manually as per need. */
    import React from 'react';
    import Calendar from '@atlaskit/calendar';

    const SimpleCalendar = () => {
      return <Calendar />;
    }
  `,
    'should remove innerProps from Calendar and leave a TODO comment',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from 'react';
    import AkCalendar from '@atlaskit/calendar';

    const SimpleCalendar = () => {
      return (
        <AkCalendar
          innerProps={{
            style: {
              border: '1px solid red',
              display: 'inline-block',
            },
          }}
        />
      );
    }
  `,
    `
    /* TODO: (@codeshift) This file uses the @atlaskit/calendar \`innerProps\` which
    has now been removed due to its poor performance characteristics. Codemod
    has auto flattened 'className' & 'style' properties inside it if present as a standalone props to calendar.
    Rest other properties if any inside innerProps will get auto-removed along with it,
    & might have to be handled manually as per need. */
    import React from 'react';
    import AkCalendar from '@atlaskit/calendar';

    const SimpleCalendar = () => {
      return <AkCalendar />;
    }
  `,
    'should also remove innerProps from some random default import name of Calendar (eg: AkCalendar) and leave a TODO comment',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from 'react';
    import Calendar from '@atlaskit/calendar';

    const SimpleCalendar = () => {
      return (
        <Calendar
        defaultDisabled={['2020-12-04']}
        defaultPreviouslySelected={['2020-12-06']}
        defaultSelected={['2020-12-08']}
          innerProps={{
            style: {
              border: '1px solid red',
              display: 'inline-block',
            },
          }}
        />
      );
    }
  `,
    `
    /* TODO: (@codeshift) This file uses the @atlaskit/calendar \`innerProps\` which
    has now been removed due to its poor performance characteristics. Codemod
    has auto flattened 'className' & 'style' properties inside it if present as a standalone props to calendar.
    Rest other properties if any inside innerProps will get auto-removed along with it,
    & might have to be handled manually as per need. */
    import React from 'react';
    import Calendar from '@atlaskit/calendar';

    const SimpleCalendar = () => {
      return (
        <Calendar
          defaultDisabled={['2020-12-04']}
          defaultPreviouslySelected={['2020-12-06']}
          defaultSelected={['2020-12-08']} />
      );
    }
  `,
    'should remove innerProps from Calendar, leave a TODO comment & just keep other props intact',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import React from 'react';
    import Calendar from '@atlaskit/calendar';

    const SimpleCalendar = () => {
      return (
        <Calendar
        defaultDisabled={['2020-12-04']}
        defaultPreviouslySelected={['2020-12-06']}
        defaultSelected={['2020-12-08']}
        />
      );
    }
  `,
    `
    import React from 'react';
    import Calendar from '@atlaskit/calendar';

    const SimpleCalendar = () => {
      return (
        <Calendar
        defaultDisabled={['2020-12-04']}
        defaultPreviouslySelected={['2020-12-06']}
        defaultSelected={['2020-12-08']}
        />
      );
    }
  `,
    'should not remove & leave a TODO comment when innerProps is itself not present',
  );
});
