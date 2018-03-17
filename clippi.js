const program = require('commander');
const http = require('http');
const util = require('./lib/util');

program
    .version('1.0.0', '-v, --version')
    .description('Default description');

program
    .command('getusers')
    .description('Get all users')
    .action(() => util.getUsers());

program
    .command('register <firstname> <lastname> <username> <password>')
    .description('Create a new user')
    .action((firstname, lastname, username, password) => {
        util.register(firstname, lastname, username, password);
    });

if (process.argv.length < 3) {
    // Not enough args
    program.help();
}

program.parse(process.argv);
