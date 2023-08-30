const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

import * as transformer from '../transform';

describe('@atlaskit/menu@0.7.0 transform', () => {
  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
      import { ButtonItem } from '@atlaskit/something';

      const App = () => {
        return <ButtonItem />;
      }
    `,
    `
      import { ButtonItem } from '@atlaskit/something';

      const App = () => {
        return <ButtonItem />;
      }
  `,
    'leaves unrelated code untouched',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
      import { ButtonItem } from '@atlaskit/menu';

      const App = () => {
        return <ButtonItem cssFn={(styles, state) => ({

        })} />;
      }
    `,
    `
      import { ButtonItem } from '@atlaskit/menu';

      const App = () => {
        return (
          <ButtonItem cssFn={state => {

          }} />
        );
      }
  `,
    'should remove current styles from inline function',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
      import { ButtonItem } from '@atlaskit/menu';

      const App = () => {
        return (
          <div cssFn={(styles, state) => ({
            ...styles,
          })}>
            <ButtonItem
              cssFn={(styles, state) => ({
                ...styles,
              })}
            />
          </div>
        );
      };

      `,
    `
      import { ButtonItem } from '@atlaskit/menu';

      const App = () => {
        return (
          <div cssFn={(styles, state) => ({
            ...styles,
          })}>
            <ButtonItem
              cssFn={state => ({})}
            />
          </div>
        );
      };
  `,
    'should remove current styles from scope',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
    import { ButtonItem } from '@atlaskit/menu';

    const App = () => {
      return <ButtonItem cssFn={(styles, state) => ({
        ...styles,
        color: 'red'
      })} />;
    }
      `,
    `
    import { ButtonItem } from '@atlaskit/menu';

    const App = () => {
      return (
        <ButtonItem cssFn={state => ({
          color: 'red'
        })} />
      );
    }
    `,
    'correctly removes spread styles',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
    import { ButtonItem } from '@atlaskit/menu';

    const App = () => {
      return <ButtonItem cssFn={(styles, state) => ({
        ...styles,
        color: 'red',
        ':hover': {
          ...styles[':hover'],
          color: 'blue'
        }
      })} />;
    }
      `,
    `
    import { ButtonItem } from '@atlaskit/menu';

    const App = () => {
      return (
        <ButtonItem cssFn={state => ({
          color: 'red',

          ':hover': {
            color: 'blue'
          }
        })} />
      );
    }
    `,
    'correctly removes spread styles with pseudo-selector access',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
    import { ButtonItem } from '@atlaskit/menu';

    const App = () => {
      return (
        <ButtonItem cssFn={(styles, state) => ({
          ...(state.x ? styles : {}),
          color: 'red'
        })} />
      );
    }
      `,
    `
    import { ButtonItem } from '@atlaskit/menu';

    const App = () => {
      return (
        <ButtonItem
          /*
          TODO: (@hypermod) The usage of the 'cssFn' prop in this component could not be transformed and requires manual intervention.
          The 'cssFn' prop has been simplified so that users no longer need to merge the inherited styles with their own overrides.
          For more info please reach out to #help-design-system-code.
          */
          cssFn={(styles, state) => ({
            ...(state.x ? styles : {}),
            color: 'red'
          })} />
      );
    }
      `,
    'fail smoothly if the current styles are being used in a non-trivial way',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
    import { ButtonItem } from '@atlaskit/menu';

    const App = () => {
      return <ButtonItem cssFn={() => ({
        color: 'red'
      })} />;
    }
      `,
    `
    import { ButtonItem } from '@atlaskit/menu';

    const App = () => {
      return <ButtonItem cssFn={() => ({
        color: 'red'
      })} />;
    }
    `,
    'not change anything if user is not using the current state or styles',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
    import { ButtonItem } from '@atlaskit/menu';

    const App = () => {
      return <ButtonItem cssFn={(styles, state) => ({
        ...styles,
        color: 'red'
      })}>
        <ButtonItem cssFn={(styles, state) => ({
          ...styles,
          color: 'red'
        })}/>
      </ButtonItem>;
    }
      `,
    `
    import { ButtonItem } from '@atlaskit/menu';

    const App = () => {
      return (
        <ButtonItem cssFn={state => ({
          color: 'red'
        })}>
          <ButtonItem cssFn={state => ({
            color: 'red'
          })}/>
        </ButtonItem>
      );
    }
    `,
    'should remove styles in nested children',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
    import { ButtonItem } from '@atlaskit/menu';

    const App = () => {
      return <ButtonItem />;
    }
      `,
    `
    import { ButtonItem } from '@atlaskit/menu';

    const App = () => {
      return <ButtonItem />;
    }
    `,
    'should leave affected items with no use of cssFn untouched',
  );
});

describe('Updates and removes current styles', () => {
  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
    import { ButtonItem } from '@atlaskit/menu';

    const cssFn = (styles, state) => ({
      ...styles,
      color: 'red'
    });

    const App = () => {
      return <ButtonItem cssFn={cssFn} />;
    }
      `,
    `
    import { ButtonItem } from '@atlaskit/menu';

    const cssFn = (styles, state) => ({
      ...styles,
      color: 'red'
    });

    const App = () => {
      return (
        <ButtonItem
          /*
          TODO: (@hypermod) The usage of the 'cssFn' prop in this component could not be transformed and requires manual intervention.
          The 'cssFn' prop has been simplified so that users no longer need to merge the inherited styles with their own overrides.
          For more info please reach out to #help-design-system-code.
          */
          cssFn={cssFn} />
      );
    }
    `,
    'should add prompt for non-inline function',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
    import { ButtonItem, LinkItem } from '@atlaskit/menu';

    const cssFunction = (styles, state) => ({
      ...styles,
      color: 'red'
    });

    const App = () => {
      return (
        <ButtonItem cssFn={cssFunction}>
          <LinkItem cssFn={cssFunction} />
        </ButtonItem>
      );
    };
      `,
    `
    import { ButtonItem, LinkItem } from '@atlaskit/menu';

    const cssFunction = (styles, state) => ({
      ...styles,
      color: 'red'
    });

    const App = () => {
      return (
        <ButtonItem
          /*
          TODO: (@hypermod) The usage of the 'cssFn' prop in this component could not be transformed and requires manual intervention.
          The 'cssFn' prop has been simplified so that users no longer need to merge the inherited styles with their own overrides.
          For more info please reach out to #help-design-system-code.
          */
          cssFn={cssFunction}>
          <LinkItem
            /*
            TODO: (@hypermod) The usage of the 'cssFn' prop in this component could not be transformed and requires manual intervention.
            The 'cssFn' prop has been simplified so that users no longer need to merge the inherited styles with their own overrides.
            For more info please reach out to #help-design-system-code.
            */
            cssFn={cssFunction} />
        </ButtonItem>
      );
    };
    `,
    'should add prompt for non-inline function to multiple instances',
  );
});
