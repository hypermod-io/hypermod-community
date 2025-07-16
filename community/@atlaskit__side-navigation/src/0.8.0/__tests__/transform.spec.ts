import { applyTransform } from '@hypermod/utils';
import transformer from '../transform';

describe('@atlaskit/side-navigation@0.8.0 transform', () => {
  describe('Updates and removes current inline styles', () => {
    it('leaves unrelated code untouched', async () => {
      const result = await applyTransform(
        transformer,
        `
      import { ButtonItem } from '@atlaskit/something';

      const App = () => {
        return <ButtonItem />;
      }
    `,
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
        "import { ButtonItem } from '@atlaskit/something';

              const App = () => {
                return <ButtonItem />;
              }"
      `);
    });

    it('should remove current styles from inline function', async () => {
      const result = await applyTransform(
        transformer,
        `
      import { ButtonItem } from '@atlaskit/side-navigation';

      const App = () => {
        return <ButtonItem cssFn={(styles, state) => ({

        })} />;
      }
    `,
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
        "import { ButtonItem } from '@atlaskit/side-navigation';

              const App = () => {
                return <ButtonItem cssFn={state => ({})} />;
              }"
      `);
    });

    it('should remove current styles from scope', async () => {
      const result = await applyTransform(
        transformer,
        `
      import { ButtonItem } from '@atlaskit/side-navigation';

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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
        import { ButtonItem } from '@atlaskit/side-navigation'; const App = ()
        => { return (
        <div cssFn={(styles, state)=>({ ...styles, })}>
          <ButtonItem cssFn={state=>({})} /></div>); };
      `);
    });

    it('correctly removes spread styles', async () => {
      const result = await applyTransform(
        transformer,
        `
    import { ButtonItem } from '@atlaskit/side-navigation';

    const App = () => {
      return <ButtonItem cssFn={(styles, state) => ({
        ...styles,
        color: 'red'
      })} />;
    }
      `,
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
        "import { ButtonItem } from '@atlaskit/side-navigation';

            const App = () => {
              return (
                <ButtonItem cssFn={state => ({
                  color: 'red'
                })} />
              );
            }"
      `);
    });

    it('correctly removes spread styles with pseudo-selector access', async () => {
      const result = await applyTransform(
        transformer,
        `
      import { ButtonItem } from '@atlaskit/side-navigation';

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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
        "import { ButtonItem } from '@atlaskit/side-navigation';

              const App = () => {
                return (
                  <ButtonItem cssFn={state => ({
                    color: 'red',

                    ':hover': {
                      color: 'blue'
                    }
                  })} />
                );
              }"
      `);
    });

    it('fail smoothly if the current styles are being used in a non-trivial way', async () => {
      const result = await applyTransform(
        transformer,
        `
      import { ButtonItem } from '@atlaskit/side-navigation';

      const App = () => {
        return (
          <ButtonItem cssFn={(styles, state) => ({
            ...(state.x ? styles : {}),
            color: 'red'
          })} />
        );
      }
        `,
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
        "import { ButtonItem } from '@atlaskit/side-navigation';

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
              }"
      `);
    });

    it('not change anything if user is not using the current state or styles', async () => {
      const result = await applyTransform(
        transformer,
        `
      import { ButtonItem } from '@atlaskit/side-navigation';

      const App = () => {
        return <ButtonItem cssFn={() => ({
          color: 'red'
        })} />;
      }
        `,
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
        "import { ButtonItem } from '@atlaskit/side-navigation';

              const App = () => {
                return <ButtonItem cssFn={() => ({
                  color: 'red'
                })} />;
              }"
      `);
    });

    it('should remove styles in nested children', async () => {
      const result = await applyTransform(
        transformer,
        `
    import { ButtonItem } from '@atlaskit/side-navigation';

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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
        "import { ButtonItem } from '@atlaskit/side-navigation';

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
            }"
      `);
    });

    it('should leave affected items with no use of cssFn untouched', async () => {
      const result = await applyTransform(
        transformer,
        `
      import { ButtonItem } from '@atlaskit/side-navigation';

      const App = () => {
        return <ButtonItem />;
      }
        `,
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
        "import { ButtonItem } from '@atlaskit/side-navigation';

              const App = () => {
                return <ButtonItem />;
              }"
      `);
    });
  });

  describe('Updates and removes current styles', () => {
    it('should add prompt for non-inline function', async () => {
      const result = await applyTransform(
        transformer,
        `
    import { ButtonItem } from '@atlaskit/side-navigation';

    const cssFn = (styles, state) => ({
      ...styles,
      color: 'red'
    });

    const App = () => {
      return <ButtonItem cssFn={cssFn} />;
    }
      `,
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
        "import { ButtonItem } from '@atlaskit/side-navigation';

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
            }"
      `);
    });

    it('should add prompt for non-inline function to multiple instances', async () => {
      const result = await applyTransform(
        transformer,
        `
      import { ButtonItem, LinkItem } from '@atlaskit/side-navigation';

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
        {
          parser: 'tsx',
        },
      );

      expect(result).toMatchInlineSnapshot(`
        "import { ButtonItem, LinkItem } from '@atlaskit/side-navigation';

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
              };"
      `);
    });
  });
});
