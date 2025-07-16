import { applyTransform } from '@hypermod/utils';

import transformer from '../transform';

describe('@atlaskit/progress-indicator@9.0.0 transform', () => {
  it('should not transform if imports are not present', async () => {
    const result = await applyTransform(
      transformer,
      `import React from 'react';`,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`"import React from 'react';"`);
  });

  it('transforms import name `ProgressDots` to `ProgressIndicator`', async () => {
    const result = await applyTransform(
      transformer,
      `import {ProgressDots} from '@atlaskit/progress-indicator';`,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(
      `"import {ProgressIndicator} from '@atlaskit/progress-indicator';"`,
    );
  });

  it('transforms import name `ProgressDots` with some other name to `ProgressIndicator`', async () => {
    const result = await applyTransform(
      transformer,
      `import { ProgressDots as CodeComponent } from '@atlaskit/progress-indicator';`,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(
      `"import { ProgressIndicator as CodeComponent } from '@atlaskit/progress-indicator';"`,
    );
  });

  it('transforms import name `ProgressDots` to `ProgressIndicator` along with its usage', async () => {
    const result = await applyTransform(
      transformer,
      `
      import { ProgressDots } from '@atlaskit/progress-indicator';
      const Component = () => <ProgressDots />;
      const x = <ProgressDots />
      const y = <ProgressDots ></ProgressDots>
      const z = ProgressDots
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import { ProgressIndicator } from '@atlaskit/progress-indicator';
            const Component = () => <ProgressIndicator />;
            const x = <ProgressIndicator />
            const y = <ProgressIndicator ></ProgressIndicator>
            const z = ProgressIndicator"
    `);
  });

  it('transforms import name `ProgressDots` to `ProgressIndicator` along with its usage inside component', async () => {
    const result = await applyTransform(
      transformer,
      `
      import { ProgressDots } from '@atlaskit/progress-indicator';

      const Component = () =>{
        return (
          <div>
            <ProgressDots />
            <ProgressDots x={10} />
            <ProgressDots></ProgressDots>
          </div>
        );
      }
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      import { ProgressIndicator } from '@atlaskit/progress-indicator'; const
      Component = () =>{ return (
      <div>
        <ProgressIndicator />
        <ProgressIndicator x={10} />
        <ProgressIndicator></ProgressIndicator>
      </div>); }
    `);
  });

  it('transforms import name `ProgressDots` to `ProgressIndicator` with some other name along with its usage', async () => {
    const result = await applyTransform(
      transformer,
      `
      import { ProgressDots as CodeComponent } from '@atlaskit/progress-indicator';
      const Component = () => <CodeComponent />;
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import { ProgressIndicator as CodeComponent } from '@atlaskit/progress-indicator';
            const Component = () => <CodeComponent />;"
    `);
  });

  it('transforms import name `ProgressDots` to `AKProgressIndicator` by renaming its imported name when `ProgressIndicator` variable is already declared', async () => {
    const result = await applyTransform(
      transformer,
      `
      import { ProgressDots } from '@atlaskit/progress-indicator';
      const ProgressIndicator = () => <ProgressDots />;
      `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import { ProgressIndicator as AKProgressIndicator } from '@atlaskit/progress-indicator';
            const ProgressIndicator = () => <AKProgressIndicator />;"
    `);
  });
});
