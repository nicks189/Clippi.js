const http = require('http');

const getOptions = {
    hostname: 'localhost',
    port: '3000',
    path: '/api/get-user/all',
    method: 'GET',
    headers: {
        authorization: 'bearer eyJhbGciOiJIUzI1NiJ9.NWE5MzA4ZjQ2ZmQwNzUwODQ2ZTIwMWI3._yHzrwVARzjph778qnt0YAUNTzPPHdSuOpxAhI8tAJ4'
    }
};

const postOptions = {
    hostname: 'localhost',
    port: '3000',
    path: '/api/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

function buildPostData(firstname, lastname, username, password) {
    return postData = {
        firstName: firstname,
        lastName: lastname,
        username: username,
        password: password,
        confirmPassword: password
    }
}

function register(firstname, lastname, username, password) {
    const req = http.request(postOptions, res => {
        res.setEncoding('utf8');
        let raw = '';
        res.on('data', (chunk) => {
            raw += chunk;
        });
        res.on('end', () => {
            console.log(JSON.parse(raw));
        });
    }).on('error', (err) => {
        console.error(`Error with request: ${err.message}`);
    });
    const postData = buildPostData(firstname, lastname, username, password);
    req.write(JSON.stringify(postData));
    req.end();
}

function getUsers() {
    const req = http.request(getOptions, res => {
        res.setEncoding('utf8');
        let raw = '';
        res.on('data', (chunk) => {
            raw += chunk;
        });
        res.on('end', () => {
            console.log(JSON.parse(raw));
        });
    }).on('error', (err) => {
        console.error(`Error with request: ${err.message}`);
    });
    req.end();
}

exports.register = register;
exports.getUsers = getUsers;
