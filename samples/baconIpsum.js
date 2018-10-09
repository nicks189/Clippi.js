#!/usr/bin/env node

'use strict';

const ClippiRequest = require('../src/clippiRequest');
const Clippi = require('../src/clippi');

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

clippi.run(process.argv);