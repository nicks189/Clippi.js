#!/usr/bin/env node

/**
 * Sample usage of Clippi.js
 */

'use strict';
const Clippi = require('../src/clippi');

let clippi = new Clippi('SampleCLI');

// Run Clippi.js with the passed arguments
clippi.run(process.argv);