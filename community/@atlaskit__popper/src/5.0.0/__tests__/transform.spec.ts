const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
import transformer from '../transform';

describe('@atlaskit/popper@5.0.0 transform', () => {
  describe('Changing popper usage', () => {
    // TODO this probably isn't worth including, as they still have to do some major work to
    //  re-work these modifiers.

    /** Modifiers:
    - format has been changed from object of objects, to array of objects, with the key for each
      modifier replaced with a name key:value pair inside the modifier object
    - modifier-specific options have been moved inside an options: key:value pair
    - modifier options have been changed significantly: check the popper.js docs for more info
  */
    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
    import { Popper } from '@atlaskit/popper';

    export default () => {
      customModifiers = {flip: {enabled: true}};
      return (
        <Popper modifiers={customModifiers}>
          {({
            ref,
            style,
            outOfBoundaries,
            scheduleUpdate,
          }) => (
            <>
              {outOfBoundaries && (
                <div ref={ref} style={style} onClick={scheduleUpdate} />
              )}
            </>
          )}
        </Popper>
    )};
  `,
      `
    /* TODO: (@codeshift) Popper.js has been upgraded from 1.14.1 to 2.4.2,
    and as a result the modifier prop has changed significantly. The format has been
    changed from object of objects, to array of objects, with the key for each modifier
    replaced with a name key:value pair inside the modifier object, and an options:object
    pair for configuration and other changes unique to each modifier.
    Further details can be found in the popper docs: https://popper.js.org/docs/v2/modifiers/ */
    import { Popper } from '@atlaskit/popper';

    export default () => {
      customModifiers = {flip: {enabled: true}};
      return (
        <Popper modifiers={customModifiers}>
          {({
            ref,
            style,
            isReferenceHidden: outOfBoundaries,
            update: scheduleUpdate
          }) => (
            <>
              {outOfBoundaries && (
                <div ref={ref} style={style} onClick={scheduleUpdate} />
              )}
            </>
          )}
        </Popper>
      );};
  `,
    );
  });

  describe('Update offset prop', () => {
    describe('offset as a string', () => {
      defineInlineTest(
        { default: transformer, parser: 'tsx' },
        {},
        `
      import { Popper } from '@atlaskit/popper';

      export default () => (
        <Popper offset='5px 8px'>
          {({ ref, style }) => (
            <div
              ref={ref}
              style={style}
            />
          )}
        </Popper>
      );
      `,
        `
      import { Popper } from '@atlaskit/popper';

      export default () => (
        <Popper offset={[5, 8]}>
          {({ ref, style }) => (
            <div
              ref={ref}
              style={style}
            />
          )}
        </Popper>
      );
      `,
        'should convert string literal to array notation',
      );

      defineInlineTest(
        { default: transformer, parser: 'tsx' },
        {},
        `
      import { Popper } from '@atlaskit/popper';

      export default () => (
        <Popper offset='5px, 8px'>
          {({ ref, style }) => (
            <div
              ref={ref}
              style={style}
            />
          )}
        </Popper>
      );
      `,
        `
      import { Popper } from '@atlaskit/popper';

      export default () => (
        <Popper offset={[5, 8]}>
          {({ ref, style }) => (
            <div
              ref={ref}
              style={style}
            />
          )}
        </Popper>
      );
      `,
        'should convert string literal to array notation - with comma',
      );
    });

    describe('offset as object expression', () => {
      defineInlineTest(
        { default: transformer, parser: 'tsx' },
        {},
        `
      import { Popper } from '@atlaskit/popper';

      export default () => (
        <Popper offset={'5px 8px'}>
          {({ ref, style }) => (
            <div
              ref={ref}
              style={style}
            />
          )}
        </Popper>
      );
      `,
        `
      import { Popper } from '@atlaskit/popper';

      export default () => (
        <Popper offset={[5, 8]}>
          {({ ref, style }) => (
            <div
              ref={ref}
              style={style}
            />
          )}
        </Popper>
      );
      `,
        `should convert object to array notation`,
      );

      defineInlineTest(
        { default: transformer, parser: 'tsx' },
        {},
        `
      import { Popper } from '@atlaskit/popper';

      function numCommaOffset() {
        return (
          <Popper offset={'5px, 8px'}>
            {({ ref, style }) => (
              <div
                ref={ref}
                style={style}
              />
            )}
          </Popper>
        );
      }
    `,
        `
      import { Popper } from '@atlaskit/popper';

      function numCommaOffset() {
        return (
          <Popper offset={[5, 8]}>
            {({ ref, style }) => (
              <div
                ref={ref}
                style={style}
              />
            )}
          </Popper>
        );
      }
      `,
        `should convert number with comma as offset`,
      );

      defineInlineTest(
        { default: transformer, parser: 'tsx' },
        {},
        `
    import { Popper } from '@atlaskit/popper';

    function numStringOffset() {
      return (
        <Popper offset={'10'}>
          {({ ref, style }) => (
            <div
              ref={ref}
              style={style}
            />
          )}
        </Popper>
      );
    }
  `,
        `
    import { Popper } from '@atlaskit/popper';

    function numStringOffset() {
      return (
        <Popper offset={[10, 0]}>
          {({ ref, style }) => (
            <div
              ref={ref}
              style={style}
            />
          )}
        </Popper>
      );
    }
    `,
        `should add default value as 0 when one offset is missing - string`,
      );

      defineInlineTest(
        { default: transformer, parser: 'tsx' },
        {},
        `
    import { Popper } from '@atlaskit/popper';

    function numOffset() {
      return (
        <Popper offset={10}>
          {({ ref, style }) => (
            <div
              ref={ref}
              style={style}
            />
          )}
        </Popper>
      );
    }
  `,
        `
    import { Popper } from '@atlaskit/popper';

    function numOffset() {
      return (
        <Popper offset={[10, 0]}>
          {({ ref, style }) => (
            <div
              ref={ref}
              style={style}
            />
          )}
        </Popper>
      );
    }
    `,
        `should add default value as 0 when one offset is missing - number`,
      );
    });

    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
  import { Popper } from '@atlaskit/popper';

  export default () => (
    <Popper offset={'5px + 7vh, 8px'}>
      {({ ref, style }) => (
        <div
          ref={ref}
          style={style}
        />
      )}
    </Popper>
  );
  `,
      `
  /* TODO: (@codeshift) Popper.js has been upgraded from 1.14.1 to 2.4.2,
  and as a result the offset prop has changed to be an array. e.g '0px 8px' -> [0, 8]
  Along with this change you cannot use vw, vh or % units or addition or multiplication
  Change the offset value to use pixel values
  Further details can be found in the popper docs https://popper.js.org/docs/v2/modifiers/offset/ */
  import { Popper } from '@atlaskit/popper';

  export default () => (
    <Popper offset={'5px + 7vh, 8px'}>
      {({ ref, style }) => (
        <div
          ref={ref}
          style={style}
        />
      )}
    </Popper>
  );
  `,
      `should add correct document string for vh, vw and %`,
    );

    /**
    If a user is passing in a variable for offset then we should leave a comment to
    update it themselves
  */
    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
    import { Popper } from '@atlaskit/popper';

    function directOffset({offset}) {
      return (
        <Popper offset={offset}>
          {({ ref, style }) => (
            <div
              ref={ref}
              style={style}
            />
          )}
        </Popper>
      );
    }
    `,
      `
    /* TODO: (@codeshift) Popper.js has been upgraded from 1.14.1 to 2.4.2, and as a result the offset
    prop has changed to be an array. e.g '0px 8px' -> [0, 8]
    As you are using a variable, you will have change the offset prop manually
    Further details can be found in the popper docs https://popper.js.org/docs/v2/modifiers/offset/ */
    import { Popper } from '@atlaskit/popper';

    function directOffset({offset}) {
      return (
        <Popper offset={offset}>
          {({ ref, style }) => (
            <div
              ref={ref}
              style={style}
            />
          )}
        </Popper>
      );
    }
    `,
      `should add correct document string for variable`,
    );

    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
    import { Manager, Popper as Popeye } from '@atlaskit/popper';

    export default () => (
      <Popeye offset={'5px 8px'}>
        {({ ref, style }) => (
          <div
            ref={ref}
            style={style}
          />
        )}
      </Popeye>
    );
    `,
      `
    import { Manager, Popper as Popeye } from '@atlaskit/popper';

    export default () => (
      <Popeye offset={[5, 8]}>
        {({ ref, style }) => (
          <div
            ref={ref}
            style={style}
          />
        )}
      </Popeye>
    );
  `,
      `should works with an aliased import and other imports`,
    );
  });

  describe('Update props', () => {
    /**
   * It should rename outOfBoundaries and scheduleUpdate props
   * Render Props:
    - `outOfBoundaries` has been replaced with `isReferenceHidden`, and is now true when the popper is hidden (i.e. by a
   scroll container)
    - `scheduleUpdate`, for async updates, has been renamed to `update`, and now returns a Promise.
  */
    defineInlineTest(
      { default: transformer, parser: 'tsx' },
      {},
      `
    import { Popper } from '@atlaskit/popper';

    export default () => (
      <Popper>
        {({
          ref,
          style,
          outOfBoundaries,
          scheduleUpdate
        }) => (
          <>
            {outOfBoundaries && (
              <div ref={ref} style={style} onClick={scheduleUpdate} />
            )}
          </>
        )}
      </Popper>
    )
  `,
      `
    import { Popper } from '@atlaskit/popper';

    export default () => (
      <Popper>
        {({
          ref,
          style,
          isReferenceHidden: outOfBoundaries,
          update: scheduleUpdate
        }) => (
          <>
            {outOfBoundaries && (
              <div ref={ref} style={style} onClick={scheduleUpdate} />
            )}
          </>
        )}
      </Popper>
    )
  `,
    );
  });
});
