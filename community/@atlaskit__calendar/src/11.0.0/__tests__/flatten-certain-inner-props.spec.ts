import { applyTransform } from '@hypermod/utils';
import { API, FileInfo, Options } from 'jscodeshift';

import flattenCertainInnerProps from '../motions/flatten-certain-inner-props';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  flattenCertainInnerProps(j, source);

  return source.toSource(options.printOptions);
}

describe('Flatten Inner Prop Style As Prop', () => {
  it('should flatten style & className properties in inner props as a new standalone props', async () => {
    const result = await applyTransform(
      transformer,
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
              className: 'abc',
            }}
          />
        )
      };
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from 'react';
            import Calendar from '@atlaskit/calendar';
            const SimpleCalendar = () => {
              return (
                (<Calendar
                  innerProps={{
                    style: {
                      border: '1px solid red',
                      display: 'inline-block',
                    },
                    className: 'abc',
                  }}
                  style={{
                    border: '1px solid red',
                    display: 'inline-block',
                  }}
                  className={'abc'} />)
              );
            };"
    `);
  });
  it('should just flatten className property in inner props as a new standalone prop', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import Calendar from '@atlaskit/calendar';
      const SimpleCalendar = () => {
        return (
          <Calendar
            innerProps={{
              className: 'abc',
            }}
          />
        )
      };
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from 'react';
            import Calendar from '@atlaskit/calendar';
            const SimpleCalendar = () => {
              return (
                (<Calendar
                  innerProps={{
                    className: 'abc',
                  }}
                  className={'abc'} />)
              );
            };"
    `);
  });
  it('should just flatten style property in inner props as a new standalone prop', async () => {
    const result = await applyTransform(
      transformer,
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
        )
      };
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from 'react';
            import Calendar from '@atlaskit/calendar';
            const SimpleCalendar = () => {
              return (
                (<Calendar
                  innerProps={{
                    style: {
                      border: '1px solid red',
                      display: 'inline-block',
                    },
                  }}
                  style={{
                    border: '1px solid red',
                    display: 'inline-block',
                  }} />)
              );
            };"
    `);
  });
  it('should not flatten any other prop in inner props if className & style prop is not present', async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import Calendar from '@atlaskit/calendar';
      const SimpleCalendar = () => {
        return (
          <Calendar
            innerProps={{
              theme: 'dark'
            }}
          />
        )
      };
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import React from 'react';
            import Calendar from '@atlaskit/calendar';
            const SimpleCalendar = () => {
              return (
                <Calendar
                  innerProps={{
                    theme: 'dark'
                  }}
                />
              )
            };"
    `);
  });
});
