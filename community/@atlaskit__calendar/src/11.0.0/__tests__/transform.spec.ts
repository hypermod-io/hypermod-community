import { applyTransform } from '@hypermod/utils';
import transformer from '../transform';

describe('@atlaskit/calendar@11.0.0 transform', () => {
  it(`should flatten style & className in innerProps as standalone prop
    & then remove innerProps`, async () => {
    const result = await applyTransform(
      transformer,
      `
    import React from 'react';
    import Calendar from '@atlaskit/calendar';

    const SimpleCalendar= () => {
      return (
        <Calendar
          defaultDisabled={['2020-12-04']}
          defaultPreviouslySelected={['2020-12-06']}
          defaultSelected={['2020-12-08']}
          defaultMonth={12}
          defaultYear={2020}
          innerProps={{
            className: 'myClass',
            style: {
              border: '1px solid red',
              display: 'inline-block',
            },
          }}
          testId="the-calendar"
        />
      );
    }
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "/* TODO: (@hypermod) This file uses the @atlaskit/calendar \`innerProps\` which
          has now been removed due to its poor performance characteristics. Codemod
          has auto flattened 'className' & 'style' properties inside it if present as a standalone props to calendar.
          Rest other properties if any inside innerProps will get auto-removed along with it,
          & might have to be handled manually as per need. */
          import React from 'react';
          import Calendar from '@atlaskit/calendar';

          const SimpleCalendar= () => {
            return (
              (<Calendar
                defaultDisabled={['2020-12-04']}
                defaultPreviouslySelected={['2020-12-06']}
                defaultSelected={['2020-12-08']}
                defaultMonth={12}
                defaultYear={2020}
                testId="the-calendar"
                className={'myClass'}
                style={{
                  border: '1px solid red',
                  display: 'inline-block',
                }} />)
            );
          }"
    `);
  });
  it(`should only flatten style & className in innerProps as standalone prop
    & then remove innerProps`, async () => {
    const result = await applyTransform(
      transformer,
      `
    import React from 'react';
    import Calendar from '@atlaskit/calendar';

    const SimpleCalendar= () => {
      return (
        <Calendar
          defaultDisabled={['2020-12-04']}
          defaultPreviouslySelected={['2020-12-06']}
          defaultSelected={['2020-12-08']}
          defaultMonth={12}
          defaultYear={2020}
          innerProps={{
            className: 'myClass',
            theme: 'dark',
            style: {
              border: '1px solid red',
              display: 'inline-block',
            },
          }}
          testId="the-calendar"
        />
      );
    }
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "/* TODO: (@hypermod) This file uses the @atlaskit/calendar \`innerProps\` which
          has now been removed due to its poor performance characteristics. Codemod
          has auto flattened 'className' & 'style' properties inside it if present as a standalone props to calendar.
          Rest other properties if any inside innerProps will get auto-removed along with it,
          & might have to be handled manually as per need. */
          import React from 'react';
          import Calendar from '@atlaskit/calendar';

          const SimpleCalendar= () => {
            return (
              (<Calendar
                defaultDisabled={['2020-12-04']}
                defaultPreviouslySelected={['2020-12-06']}
                defaultSelected={['2020-12-08']}
                defaultMonth={12}
                defaultYear={2020}
                testId="the-calendar"
                className={'myClass'}
                style={{
                  border: '1px solid red',
                  display: 'inline-block',
                }} />)
            );
          }"
    `);
  });
  it(`should not flatten any other prop apart from style & className in innerProps
      & just remove innerProps`, async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import Calendar from '@atlaskit/calendar';
      const SimpleCalendar= () => {
        return (
          <Calendar
            defaultDisabled={['2020-12-04']}
            defaultPreviouslySelected={['2020-12-06']}
            defaultSelected={['2020-12-08']}
            defaultMonth={12}
            defaultYear={2020}
            innerProps={{
              dummyInnerProp: 'dummy'
            }}
            testId="the-calendar"
          />
        );
      }
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "/* TODO: (@hypermod) This file uses the @atlaskit/calendar \`innerProps\` which
            has now been removed due to its poor performance characteristics. Codemod
            has auto flattened 'className' & 'style' properties inside it if present as a standalone props to calendar.
            Rest other properties if any inside innerProps will get auto-removed along with it,
            & might have to be handled manually as per need. */
            import React from 'react';
            import Calendar from '@atlaskit/calendar';
            const SimpleCalendar= () => {
              return (
                (<Calendar
                  defaultDisabled={['2020-12-04']}
                  defaultPreviouslySelected={['2020-12-06']}
                  defaultSelected={['2020-12-08']}
                  defaultMonth={12}
                  defaultYear={2020}
                  testId="the-calendar" />)
              );
            }"
    `);
  });
});
