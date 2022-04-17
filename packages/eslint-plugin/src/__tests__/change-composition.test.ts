import { RuleTester } from 'eslint';

import rule from '../rules/change-composition';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('change-composition', rule, {
  valid: [
    {
      code: '<Modal />',
    },
  ],
  invalid: [
    {
      code: `
      import React from 'react'
      import Modal, { ModalTransition } from '@atlaskit/modal-dialog'
  
      const App = () => {
        return <Modal heading="some heading" testId="modal" isBlanketHidden />
      }
      `,
      errors: ['error'],
      output: `
      import React from 'react'
      // The import "ModalHeader" has been added by codemod
import Modal, { ModalTransition, ModalHeader } from '@atlaskit/modal-dialog'
  
      const App = () => {
        return (
               <Modal testId="modal" isBlanketHidden>
                 <ModalHeader>
                   some heading
                 </ModalHeader>
               </Modal>
               )
      }
      `,
    },
    {
      code: `
      import React from 'react'
      import Modal, { ModalTransition } from '@atlaskit/modal-dialog'
  
      const App = () => {
        return <Modal heading="some heading" testId="modal" isBlanketHidden><Bread /></Modal>
      }
      `,
      errors: ['error'],
      output: `
      import React from 'react'
      // The import "ModalHeader" has been added by codemod
import Modal, { ModalTransition, ModalHeader } from '@atlaskit/modal-dialog'
  
      const App = () => {
        return (
               <Modal testId="modal" isBlanketHidden>
                 <Bread />
                 <ModalHeader>
                   some heading
                 </ModalHeader>
               </Modal>
               )
      }
      `,
    },
    {
      code: `
      import React from 'react'
      import Modal from '@atlaskit/modal-dialog'
  
      const App = () => {
        return <Modal heading={"some heading"} testId="modal" isBlanketHidden />
      }
      `,
      errors: ['error'],
      output: `
      import React from 'react'
      // The import "ModalHeader" has been added by codemod
import Modal, { ModalHeader } from '@atlaskit/modal-dialog'
  
      const App = () => {
        return (
               <Modal testId="modal" isBlanketHidden>
                 <ModalHeader>
                   {"some heading"}
                 </ModalHeader>
               </Modal>
               )
      }
      `,
    },
    {
      code: `
      import React from 'react'
      import Modal, { ModalTransition } from '@atlaskit/modal-dialog'
  
      const App = () => {
        return <Modal heading="some heading" appearance="warning" testId="modal" isBlanketHidden />
      }
      `,
      errors: ['error'],
      output: `
      import React from 'react'
      // The import "ModalHeader" has been added by codemod
import Modal, { ModalTransition, ModalHeader } from '@atlaskit/modal-dialog'
  
      const App = () => {
        return (
               <Modal appearance="warning" testId="modal" isBlanketHidden>
                 <ModalHeader>
                   some heading
                 </ModalHeader>
               </Modal>
               )
      }
      `,
    },
  ],
});
