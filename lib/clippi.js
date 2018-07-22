const program = require('commander');
const ClippiRequest = require('./clippiRequest');

var Clippi = function (desc, vers) {
    this.description = desc || '';
    this.version = vers || '1.0.0';
    this.requests = [];
    this.program = program;
    this.program
        .version(this.version)
        .description(this.description);
    this.defaultAction = function () {
        program.help();
    }
};

Clippi.prototype.addRequest = function (cmd, desc, options, fields) {
    let cr;
    if (!(cmd instanceof ClippiRequest)) {
        cr = new ClippiRequest(cmd, options, desc, fields);
    } else {
        cr = cmd;
    }
    let command = this.program.command(cr.commandString);
    command
        .description(cr.description)
        .action(() => {
            cr.run((err, res) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log(res);
                }
            });
        });
    cr.setCommand(command);
    this.requests.push(cr);
};

Clippi.prototype.setDescription = function (desc) {
    this.description = desc;
    this.program.description(desc);
};

Clippi.prototype.setVersion = function (vers) {
    this.version = vers;
    this.program.version(vers);
};

Clippi.prototype.setDefaultAction = function (action) {
    this.defaultAction = action;
};

Clippi.prototype.setActionForRequest = function (cr, action) {
    cr.command.action(action);
};

Clippi.prototype.run = function (argv) {
    // If no args are supplied, run default action
    if (argv.length < 3) {
        this.defaultAction();
    } else {
        this.program.parse(argv);
    }
};

module.exports = Clippi;
