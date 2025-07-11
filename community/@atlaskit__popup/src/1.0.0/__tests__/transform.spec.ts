const applyTransform = require('jscodeshift/dist/testUtils').applyTransform;

import transformer from '../transform';

interface TestArgs {
  it: string;
  original: string;
  expected: string;
  mode?: 'only' | 'skip';
  before?: () => void;
  after?: () => void;
}

function check({
  it: name,
  original,
  expected,
  before = () => {},
  after = () => {},
  mode = undefined,
}: TestArgs) {
  const run = mode === 'only' ? it.only : mode === 'skip' ? it.skip : it;

  run(name, () => {
    before();
    try {
      const output: string = applyTransform(
        { default: transformer, parser: 'tsx' },
        {},
        { source: original },
      );
      expect(output).toBe(expected.trim());
    } catch (e) {
      // a failed assertion will throw
      after();
      throw e;
    }
    // will only be hit if we don't throw
    after();
  });
}

describe('@atlaskit/popup@1.0.0 transform', () => {
  check({
    it: 'should turn `boundariesElement="scrollParents"` to `boundary="clippingParents"`',
    original: `
        import Popup from '@atlaskit/popup';

        export default () => (
          <Popup
            isOpen={isOpen}
            onClose={() => {}}
            boundariesElement='scrollParents'
            placement="bottom-start"
            content={() => (
              <div />
            )}
            trigger={triggerProps => (
              <div />
            )}
          />
        );
      `,
    expected: `
        import Popup from '@atlaskit/popup';

        export default () => (
          <Popup
            isOpen={isOpen}
            onClose={() => {}}
            boundary="clippingParents"
            placement="bottom-start"
            content={() => (
              <div />
            )}
            trigger={triggerProps => (
              <div />
            )}
          />
        );
      `,
  });

  check({
    it: 'should turn `boundariesElement="window"` into `rootBoundary="document"`',
    original: `
        import Popup from '@atlaskit/popup';

        export default () => (
          <Popup
            isOpen={isOpen}
            onClose={() => {}}
            boundariesElement='window'
            placement="bottom-start"
            content={() => (
              <div />
            )}
            trigger={triggerProps => (
              <div />
            )}
          />
        );
      `,
    expected: `
        import Popup from '@atlaskit/popup';

        export default () => (
          <Popup
            isOpen={isOpen}
            onClose={() => {}}
            rootBoundary="document"
            placement="bottom-start"
            content={() => (
              <div />
            )}
            trigger={triggerProps => (
              <div />
            )}
          />
        );
      `,
  });

  check({
    it: 'should turn `boundariesElement="viewport"` into `rootBoundary="viewport"`',
    original: `
        import Popup from '@atlaskit/popup';

        export default () => (
          <Popup
            isOpen={isOpen}
            onClose={() => {}}
            boundariesElement="viewport"
            placement="bottom-start"
            content={() => (
              <div />
            )}
            trigger={triggerProps => (
              <div />
            )}
          />
        );
      `,
    expected: `
        import Popup from '@atlaskit/popup';

        export default () => (
          <Popup
            isOpen={isOpen}
            onClose={() => {}}
            rootBoundary="viewport"
            placement="bottom-start"
            content={() => (
              <div />
            )}
            trigger={triggerProps => (
              <div />
            )}
          />
        );
      `,
  });
});

describe('Convert offset props', () => {
  /**
    `offset` prop is no longer a string, but an array of two integers (i.e. '0px 8px' is now [0, 8])
  */
  check({
    it: 'should convert offset from a string to an array of two integers',
    original: `
    import Popup from '@atlaskit/popup';

    export default () => (
      <Popup
        isOpen={isOpen}
        onClose={() => {}}
        offset={'5px 8px'}
        content={() => (
          <div />
        )}
        trigger={triggerProps => (
          <div />
        )}
      />
    );

    function numCommaOffset() {
      return (
        <Popup
          isOpen={isOpen}
          onClose={() => {}}
          offset={'5px, 8px'}
          content={() => (
            <div />
          )}
          trigger={triggerProps => (
            <div />
          )}
        />
      );
    }

    function numStringOffset() {
      return (
        <Popup
          isOpen={isOpen}
          onClose={() => {}}
          offset={'10'}
          content={() => (
            <div />
          )}
          trigger={triggerProps => (
            <div />
          )}
        />
      );
    }

    function numOffset() {
      return (
        <Popup
          isOpen={isOpen}
          onClose={() => {}}
          offset={10}
          content={() => (
            <div />
          )}
          trigger={triggerProps => (
            <div />
          )}
        />
      );
    }
  `,
    expected: `
    import Popup from '@atlaskit/popup';

    export default () => (
      <Popup
        isOpen={isOpen}
        onClose={() => {}}
        offset={[5, 8]}
        content={() => (
          <div />
        )}
        trigger={triggerProps => (
          <div />
        )}
      />
    );

    function numCommaOffset() {
      return (
        (<Popup
          isOpen={isOpen}
          onClose={() => {}}
          offset={[5, 8]}
          content={() => (
            <div />
          )}
          trigger={triggerProps => (
            <div />
          )}
        />)
      );
    }

    function numStringOffset() {
      return (
        (<Popup
          isOpen={isOpen}
          onClose={() => {}}
          offset={[10, 0]}
          content={() => (
            <div />
          )}
          trigger={triggerProps => (
            <div />
          )}
        />)
      );
    }

    function numOffset() {
      return (
        (<Popup
          isOpen={isOpen}
          onClose={() => {}}
          offset={[10, 0]}
          content={() => (
            <div />
          )}
          trigger={triggerProps => (
            <div />
          )}
        />)
      );
    }
    `,
  });
  /**
    If a user is passing in an offset with vh, vw or % in the offset
    Let them know that's no longer supported
  */
  check({
    it: 'should warn users using vh, vw or % in the offset',
    original: `
    import Popup from '@atlaskit/popup';

    export default () => (
      <Popup
        isOpen={isOpen}
        onClose={() => {}}
        offset={'5px + 7vh, 8px'}
        content={() => (
          <div />
        )}
        trigger={triggerProps => (
          <div />
        )}
      />
    );
    `,
    expected: `
    /* TODO: (@hypermod) Popper.js has been upgraded from 1.14.1 to 2.4.2,
    and as a result the offset prop has changed to be an array. e.g '0px 8px' -> [0, 8]
    Along with this change you cannot use vw, vh or % units or addition or multiplication
    Change the offset value to use pixel values
    Further details can be found in the popper docs https://popper.js.org/docs/v2/modifiers/offset/ */
    import Popup from '@atlaskit/popup';

    export default () => (
      <Popup
        isOpen={isOpen}
        onClose={() => {}}
        offset={'5px + 7vh, 8px'}
        content={() => (
          <div />
        )}
        trigger={triggerProps => (
          <div />
        )}
      />
    );
    `,
  });

  /**
    If a user is passing in a variable for offset then we should leave a comment to
    update it themselves
  */
  check({
    it: 'warn users passing in a variable for an offset',
    original: `
    import Popup from '@atlaskit/popup';

    function directOffset({offset}) {
      return (
       <Popup
        isOpen={isOpen}
        onClose={() => {}}
        offset={offset}
        content={() => (
          <div />
        )}
        trigger={triggerProps => (
          <div />
        )}
      />
      );
    }
    `,
    expected: `
    /* TODO: (@hypermod) Popper.js has been upgraded from 1.14.1 to 2.4.2, and as a result the offset
    prop has changed to be an array. e.g '0px 8px' -> [0, 8]
    As you are using a variable, you will have change the offset prop manually
    Further details can be found in the popper docs https://popper.js.org/docs/v2/modifiers/offset/ */
    import Popup from '@atlaskit/popup';

    function directOffset({offset}) {
      return (
       <Popup
        isOpen={isOpen}
        onClose={() => {}}
        offset={offset}
        content={() => (
          <div />
        )}
        trigger={triggerProps => (
          <div />
        )}
      />
      );
    }
    `,
  });
  // Works with an aliased import and other imports
  check({
    it: 'should work with aliased import and other imports',
    original: `

    import AkPopup, { PopupProps as AkPopupProps, TriggerProps as AkTriggerProps } from '@atlaskit/popup';

    export default () => (
      <AkPopup
        isOpen={isOpen}
        onClose={() => {}}
        offset={'5px, 8px'}
        content={() => (
          <div />
        )}
        trigger={triggerProps => (
          <div />
        )}
      />
    );
    `,
    expected: `
    import AkPopup, { PopupProps as AkPopupProps, TriggerProps as AkTriggerProps } from '@atlaskit/popup';

    export default () => (
      <AkPopup
        isOpen={isOpen}
        onClose={() => {}}
        offset={[5, 8]}
        content={() => (
          <div />
        )}
        trigger={triggerProps => (
          <div />
        )}
      />
    );
  `,
  });

  // Works when not a default import
  check({
    it: 'should work when not accessed using a default import',
    original: `
      import { Popup } from '@atlaskit/popup';

      export default () => (
        <Popup
          isOpen={isOpen}
          onClose={() => {}}
          offset={'5px, 8px'}
          content={() => (
            <div />
          )}
          trigger={triggerProps => (
            <div />
          )}
        />
      );
      `,
    expected: `
      import { Popup } from '@atlaskit/popup';

      export default () => (
        <Popup
          isOpen={isOpen}
          onClose={() => {}}
          offset={[5, 8]}
          content={() => (
            <div />
          )}
          trigger={triggerProps => (
            <div />
          )}
        />
      );
    `,
  });
});

/** Render Props:
   - `scheduleUpdate`, for async updates, has been renamed to `update`, and now returns a Promise.
  */
describe('Convert render props', () => {
  check({
    it: 'should rename schedulUpdate to `update`',
    original: `
        import Popup from '@atlaskit/popup';

        export default () => (
          <Popup
            isOpen={isOpen}
            onClose={() => {}}
            placement="bottom-start"
            content={({ scheduleUpdate }) => (
              <div />
            )}
            trigger={triggerProps => (
              <div />
            )}
          />
        );
      `,
    expected: `
        import Popup from '@atlaskit/popup';

        export default () => (
          <Popup
            isOpen={isOpen}
            onClose={() => {}}
            placement="bottom-start"
            content={({
              update: scheduleUpdate
            }) => (
              <div />
            )}
            trigger={triggerProps => (
              <div />
            )}
          />
        );
      `,
  });
});
