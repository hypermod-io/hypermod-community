import { applyTransform } from '@hypermod/utils';
import { API, FileInfo, Options } from 'jscodeshift';

import changeAppearanceProp from '../motions/change-appearance-prop';

function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  changeAppearanceProp(j, source);

  return source.toSource(options.printOptions);
}

describe('SectionMessage code-mods', () => {
  it(`should change the value of appearance prop from "info" to "information"`, async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';

      const App = () => {
        return (
          <SectionMessage
            title="The Modern Prometheus"
            appearance="info"
            actions={[
              {
                key: 'mary',
                href: 'https://en.wikipedia.org/wiki/Mary_Shelley',
                text: 'Mary',
              },
            ]}
            testId="section-message"
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';

      const App = () => {
        return (
          <SectionMessage
            title="The Modern Prometheus"
            appearance="information"
            actions={[
              {
                key: 'mary',
                href: 'https://en.wikipedia.org/wiki/Mary_Shelley',
                text: 'Mary',
              },
            ]}
            testId="section-message"
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `);
  });

  it(`should change the value of appearance prop from "confirmation" to "success"`, async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';

      const App = () => {
        return (
          <SectionMessage
            title="The Modern Prometheus"
            appearance="confirmation"
            actions={[]}
            testId="section-message"
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';

      const App = () => {
        return (
          <SectionMessage
            title="The Modern Prometheus"
            appearance="success"
            actions={[]}
            testId="section-message"
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `);
  });

  it(`should change the value of appearance prop from "change" to "discovery"`, async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';

      const App = () => {
        return (
          <SectionMessage
            appearance="change"
            actions={[]}
            testId="section-message"
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';

      const App = () => {
        return (
          <SectionMessage
            appearance="discovery"
            actions={[]}
            testId="section-message"
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `);
  });

  it(`should change the value of appearance prop from "change" to "discovery" when appearance value is string wrapped in JSX expression`, async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';
      const App = () => {
        return (
          <SectionMessage
            appearance={"change"}
            actions={[]}
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';
      const App = () => {
        return (
          <SectionMessage
            appearance="discovery"
            actions={[]}
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `);
  });

  it(`should not change the value of appearance prop when it's not one of "info","confirmation","change"`, async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';

      const App = () => {
        return (
          <SectionMessage
            title="The Modern Prometheus"
            appearance="warn"
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';

      const App = () => {
        return (
          <SectionMessage
            title="The Modern Prometheus"
            appearance="warn"
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `);
  });

  it(`should not change the value of appearance prop when it's not one of "info","confirmation","change" and value is string wrapped in JSX expression`, async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';
      const App = () => {
        return (
          <SectionMessage
            appearance={"warn"}
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';
      const App = () => {
        return (
          <SectionMessage
            appearance={"warn"}
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `);
  });

  it(`should add appearance mapping when appearance prop value is other than string`, async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';
      const appearanceValue = "change";
      const App = () => {
        const { appearanceValue } = props;
        return (
          <SectionMessage
            appearance={appearanceValue}
            actions={[]}
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';
      const appearanceValue = "change";
      const App = () => {
        const { appearanceValue } = props;
        return (
          <SectionMessage
            /* TODO: (@hypermod) We have added this temporary appearance mapping here to make things work. Feel free to change it accordingly. We have also added @ts-ignore for typescript files.
            @ts-ignore */
            appearance={{
              info: "information",
              confirmation: "success",
              change: "discovery"
            }[appearanceValue] || appearanceValue}
            actions={[]}
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `);
  });

  it(`should add appearance mapping when appearance prop value is conditional type`, async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';
      const appearanceValue = "error";
      const App = () => {
        const { appearanceValue } = props;
        return (
          <SectionMessage
            appearance={true ? appearanceValue : 'info'}
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';
      const appearanceValue = "error";
      const App = () => {
        const { appearanceValue } = props;
        return (
          <SectionMessage
            /* TODO: (@hypermod) We have added this temporary appearance mapping here to make things work. Feel free to change it accordingly. We have also added @ts-ignore for typescript files.
            @ts-ignore */
            appearance={{
              info: "information",
              confirmation: "success",
              change: "discovery"
            }[true ? appearanceValue : 'info'] || (true ? appearanceValue : 'info')}
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `);
  });

  it(`should add appearance mapping when appearance prop value is complex object type`, async () => {
    const result = await applyTransform(
      transformer,
      `
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';
      const appearance = { value: { ohRealValue: "error" } };

      const App = () => {
        return (
          <SectionMessage
            appearance={appearance.value.ohRealValue}
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from 'react';
      import SectionMessage from '@atlaskit/section-message';
      const appearance = { value: { ohRealValue: "error" } };

      const App = () => {
        return (
          <SectionMessage
            /* TODO: (@hypermod) We have added this temporary appearance mapping here to make things work. Feel free to change it accordingly. We have also added @ts-ignore for typescript files.
            @ts-ignore */
            appearance={{
              info: "information",
              confirmation: "success",
              change: "discovery"
            }[appearance.value.ohRealValue] || appearance.value.ohRealValue}
          >
            <p>
              Description
            </p>
          </SectionMessage>
        );
      }
      `);
  });
});
