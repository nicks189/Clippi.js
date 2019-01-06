#!/usr/bin/env node

/**
 * Sample usage of Clippi.js using baconipsum.com (generate text full of bacon!)
 */

'use strict';
const Clippi = require('../src/clippi');
const ClippiRequest = require('../src/clippiRequest');

let clippi = new Clippi('BaconIpsum', '1.0.0');
clippi.setDefaultAction(function () { console.log("Hello World!") });

let bacon = new ClippiRequest('bacon', 'Get some bacon from the interwebs',
    {
        // https://baconipsum.com/api/?type=meat-and-filler
        hostname: 'baconipsum.com',
        path: '/api/?type=meat-and-filler',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
);
clippi.addRequest(bacon);

// Run Clippi.js with the passed arguments
clippi.run(process.argv);