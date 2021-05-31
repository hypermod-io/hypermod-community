#!/usr/bin/env node
/* eslint-disable */

const fs = require('fs');
const path = require('path');
const project = path.join(__dirname, '../tsconfig.json');
const dev = fs.existsSync(project);

if (dev && !require.extensions['.ts']) {
  // ts-node can only handle being registered once, see https://github.com/TypeStrong/ts-node/issues/409
  require('ts-node').register({ project });
}

try {
  require(path.join('..', dev ? 'src/index' : 'dist/codeshift-cli.cjs.js'));
} catch (error) {
  if (typeof error === 'number') {
    process.exit(error);
  }
  console.error(error);
  process.exit(1);
}
