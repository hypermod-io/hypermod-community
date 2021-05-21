const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

import transformer from '../transform';

describe('@atlaskit/progress-indicator@9.0.0 transform', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `import React from 'react';`,
    `import React from 'react';`,
    'should not transform if imports are not present',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `import {ProgressDots} from '@atlaskit/progress-indicator';`,
    `import {ProgressIndicator} from '@atlaskit/progress-indicator';`,
    'transforms import name `ProgressDots` to `ProgressIndicator`',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `import { ProgressDots as CodeComponent } from '@atlaskit/progress-indicator';`,
    `import { ProgressIndicator as CodeComponent } from '@atlaskit/progress-indicator';`,
    'transforms import name `ProgressDots` with some other name to `ProgressIndicator`',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import { ProgressDots } from '@atlaskit/progress-indicator';
    const Component = () => <ProgressDots />;
    const x = <ProgressDots />
    const y = <ProgressDots ></ProgressDots>
    const z = ProgressDots
    `,
    `
    import { ProgressIndicator } from '@atlaskit/progress-indicator';
    const Component = () => <ProgressIndicator />;
    const x = <ProgressIndicator />
    const y = <ProgressIndicator ></ProgressIndicator>
    const z = ProgressIndicator
    `,
    'transforms import name `ProgressDots` to `ProgressIndicator` along with its usage',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
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
    `
    import { ProgressIndicator } from '@atlaskit/progress-indicator';

    const Component = () =>{
      return (
        <div>
          <ProgressIndicator />
          <ProgressIndicator x={10} />
          <ProgressIndicator></ProgressIndicator>
        </div>
      );
    }
    `,
    'transforms import name `ProgressDots` to `ProgressIndicator` along with its usage inside component',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import { ProgressDots as CodeComponent } from '@atlaskit/progress-indicator';
    const Component = () => <CodeComponent />;
    `,
    `
    import { ProgressIndicator as CodeComponent } from '@atlaskit/progress-indicator';
    const Component = () => <CodeComponent />;
    `,
    'transforms import name `ProgressDots` to `ProgressIndicator` with some other name along with its usage',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import { ProgressDots } from '@atlaskit/progress-indicator';
    const ProgressIndicator = () => <ProgressDots />;
    `,
    `
    import { ProgressIndicator as AKProgressIndicator } from '@atlaskit/progress-indicator';
    const ProgressIndicator = () => <AKProgressIndicator />;
    `,
    'transforms import name `ProgressDots` to `AKProgressIndicator` by renaming its imported name when `ProgressIndicator` variable is already declared',
  );
});
