#!/usr/bin/env node

'use strict';

const ClippiRequest = require('../lib/clippiRequest');
const Clippi = require('../lib/clippi');

let clippi = new Clippi('StringCenter sample', '1.0.0');
clippi.setDefaultAction(console.log("Hello World!"));

let getusers = new ClippiRequest('getusers', 'Get all users',
    {
        hostname: 'localhost',
        port: '3000',
        path: '/api/get-user/all',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'bearer eyJhbGciOiJIUzI1NiJ9.NWE5MzA4ZjQ2ZmQwNzUwODQ2ZTIwMWI3._yHzrwVARzjph778qnt0YAUNTzPPHdSuOpxAhI8tAJ4'
        }
    }
);
clippi.addRequest(getusers);

let register = new ClippiRequest('register', 'Create a new user',
    {
        hostname: 'localhost',
        port: '3000',
        path: '/api/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    },
    [
        'firstname',
        'lastname',
        'description',
        'username',
        'password'
    ]
);
clippi.addRequest(register);
clippi.setActionForRequest(register, (firstname, lastname, description, username, password) => {
    register.setBody({
        firstName: firstname,
        lastName: lastname,
        description: description,
        username: username,
        password: password,
        confirmPassword: password
    });
    register.run((err, res) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log(res);
        }
    });
});

clippi.run(process.argv);
