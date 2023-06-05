#!/usr/bin/env node
const path = require('path');

const packageJson = require('../package.json');

require(path.join('..', packageJson.main));
