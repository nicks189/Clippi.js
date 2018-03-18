#!/usr/bin/env node

'use strict';

const program = require('commander');
const ClippiRequest = require('./lib/clippiRequest');

program
    .version('1.0.0', '-v, --version')
    .description('Default description');

program
    .command('getusers')
    .description('Get all users')
    .action(() =>  {
        let cr = new ClippiRequest('http://localhost:3000/api/get-user/all');
        cr.setContentType('application/json');
        cr.setAuthHeader('bearer eyJhbGciOiJIUzI1NiJ9.NWE5MzA4ZjQ2ZmQwNzUwODQ2ZTIwMWI3._yHzrwVARzjph778qnt0YAUNTzPPHdSuOpxAhI8tAJ4');
        cr.run((err, res) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(res);
            }
        });
    });

program
    .command('register <firstname> <lastname> <username> <password>')
    .description('Create a new user')
    .action((firstname, lastname, username, password) => {
        let options = {
            hostname: 'localhost',
            port: '3000',
            path: '/api/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let cr = new ClippiRequest(options);
        cr.setPostBody({
            firstName: firstname,
            lastName: lastname,
            username: username,
            password: password,
            confirmPassword: password
        });
        cr.run((err, res) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(res);
            }
        });
    });

if (process.argv.length < 3) {
    // Not enough args
    program.help();
}

program.parse(process.argv);
