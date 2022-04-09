#!/usr/bin/env node
const tryCatch = require('try-catch');
const isNumber = a => typeof a === 'number';
/* eslint-disable */

const fs = require('fs');
const path = require('path');
const project = path.join(__dirname, '../tsconfig.json');
const dev = fs.existsSync(project);

if (dev && !require.extensions['.ts']) {
  // ts-node can only handle being registered once, see https://github.com/TypeStrong/ts-node/issues/409
  require('ts-node').register({ project });
}

const [error] = tryCatch(require, path.join('..', dev ? 'src/index' : 'dist/codeshift-cli.cjs.js'));

if (error) {
  if (isNumber(error)) {
    process.exit(error);
  }
  console.error(error);
  process.exit(1);
}
