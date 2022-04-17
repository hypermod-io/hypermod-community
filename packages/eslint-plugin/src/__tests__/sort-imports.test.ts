/**
 * @fileoverview Tests for sort-imports rule.
 * @author Christian Schuller
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import rule from '../rules/sort-imports';
import { RuleTester } from 'eslint';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parserOptions: { ecmaVersion: 6, sourceType: 'module' },
  }),
  ignoreCaseArgs = [{ ignoreCase: true }];

ruleTester.run('sort-imports', rule, {
  valid: [
    `import a from 'foo.js'`,
    "import {a, b} from 'bar.js';",
    "import {b, c} from 'bar.js';\n" + "import A from 'foo.js';",
    {
      code: "import A from 'bar.js';\n" + "import {b, c} from 'foo.js';",
    },
    "import {a, b} from 'bar.js';\n" + "import {c, d} from 'foo.js';",
    "import A from 'foo.js';\n" + "import B from 'bar.js';",
    "import A from 'foo.js';\n" + "import a from 'bar.js';",
    "import a, * as b from 'foo.js';\n" + "import c from 'bar.js';",
    "import 'foo.js';\n" + " import a from 'bar.js';",
    "import B from 'foo.js';\n" + "import a from 'bar.js';",
    {
      code: "import a from 'foo.js';\n" + "import B from 'bar.js';",
      options: ignoreCaseArgs,
    },
    "import {a, b, c, d} from 'foo.js';",
    {
      code: "import a from 'foo.js';\n" + "import B from 'bar.js';",
    },
    {
      code: "import {a, B, c, D} from 'foo.js';",
      options: ignoreCaseArgs,
    },
    "import a, * as b from 'foo.js';",
    "import * as a from 'foo.js';\n" + '\n' + "import b from 'bar.js';",
    "import * as bar from 'bar.js';\n" + "import * as foo from 'foo.js';",

    // https://github.com/eslint/eslint/issues/5130
    {
      code: "import 'foo';\n" + "import bar from 'bar';",
      options: ignoreCaseArgs,
    },

    // https://github.com/eslint/eslint/issues/5305
    "import React, {Component} from 'react';",
  ],
  invalid: [
    {
      code: "import {b, A, C, d} from 'foo.js';",
      output: "import { A, b, C, d } from 'foo.js'",
      options: ignoreCaseArgs,
      errors: [
        {
          messageId: 'sortMembersAlphabetically',
          type: 'ImportSpecifier',
        },
      ],
    },
    {
      code: "import a, { d, c as b } from 'foo.js';\n",
      output: "import a, { c as b, d } from 'foo.js'\n",
      errors: [
        {
          messageId: 'sortMembersAlphabetically',
          type: 'ImportSpecifier',
        },
      ],
    },
    {
      code: `
import {
    boop,
    foo,
    zoo,
    baz as qux,
    bar,
    beep
} from 'foo.js';
             `,
      output: `
import {
bar,
  beep,
  boop,
  foo,
  baz as qux,
  zoo
} from 'foo.js'
             `,
      errors: [
        {
          messageId: 'sortMembersAlphabetically',
          type: 'ImportSpecifier',
        },
      ],
    },
  ],
});
