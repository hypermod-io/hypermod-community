#!/usr/bin/env node
/* eslint-disable */

const packageJson = require('../package.json');

require('../' + packageJson.main);
