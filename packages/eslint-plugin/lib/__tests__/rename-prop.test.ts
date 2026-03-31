import { RuleTester } from 'eslint';

import rule, { UpdatePropNameOptions } from '../rules/rename-prop';

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('jsx/update-prop-name', rule, {
  valid: [
    {
      options: [
        {
          source: '@atlaskit/modal-dialog',
          specifier: 'Modal',
          oldProp: 'open',
          newProp: 'isOpen',
        },
      ] as UpdatePropNameOptions[],
      code: `
      import { Modal as AKModal } from  '@atlaskit/modal-dialog'

      const App = () => (
        <Hello>
          <AKModal isOpen={false} />
        </Hello>
      )
`,
    },
    {
      code: `
const App = () => (
  <Hello>
    <AKModal open={false} />
  </Hello>
)
`,
    },
  ],
  invalid: [
    {
      options: [
        {
          source: '@atlaskit/modal-dialog',
          specifier: 'Modal',
          oldProp: 'open',
          newProp: 'isOpen',
        },
      ] as UpdatePropNameOptions[],
      code: `
import { Modal } from  '@atlaskit/modal-dialog'

const App = () => (
  <Hello>
    <Modal open={false} />
  </Hello>
)
`,
      errors: [{ messageId: 'renameProp' }],
      output: `
import { Modal } from  '@atlaskit/modal-dialog'

const App = () => (
  <Hello>
    <Modal isOpen={false} />
  </Hello>
)
`,
    },
    {
      options: [
        {
          source: '@atlaskit/modal-dialog',
          specifier: 'Modal',
          oldProp: 'open',
          newProp: 'isOpen',
        },
      ] as UpdatePropNameOptions[],
      code: `
import { Modal as AKModal } from  '@atlaskit/modal-dialog'

const App = () => (
  <Hello>
    <AKModal open={false} />
  </Hello>
)
`,
      errors: [{ messageId: 'renameProp' }],
      output: `
import { Modal as AKModal } from  '@atlaskit/modal-dialog'

const App = () => (
  <Hello>
    <AKModal isOpen={false} />
  </Hello>
)
`,
    },
    {
      options: [
        {
          source: '@example/thing',
          specifier: 'Checkbox',
          oldProp: 'selected',
          newProp: 'checked',
        },
      ] as UpdatePropNameOptions[],
      code: `
import { Checkbox } from  '@example/thing'

const App = () => (
  <Hello>
    <Checkbox selected={false} />
  </Hello>
)
`,
      errors: [{ messageId: 'renameProp' }],
      output: `
import { Checkbox } from  '@example/thing'

const App = () => (
  <Hello>
    <Checkbox checked={false} />
  </Hello>
)
`,
    },
    {
      options: [
        {
          source: '@example/thing',
          specifier: 'default',
          oldProp: 'selected',
          newProp: 'checked',
        },
      ] as UpdatePropNameOptions[],
      code: `
import Checkbox from  '@example/thing'

const App = () => (
  <Hello>
    <Checkbox selected={false} />
  </Hello>
)
`,
      errors: [{ messageId: 'renameProp' }],
      output: `
import Checkbox from  '@example/thing'

const App = () => (
  <Hello>
    <Checkbox checked={false} />
  </Hello>
)
`,
    },
  ],
});
