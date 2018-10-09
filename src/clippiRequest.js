const url = require('url');
const https = require('https');
const util = require('./util');

// ClippiRequest class
var ClippiRequest = function (cmdstring, desc, options, fields) {
    this.commandString = util.buildCommandString(cmdstring, fields);
    this.description = desc;
    this.options = util.buildReqOptions(options);
    this.encoding = 'utf8';
    this.fields = fields;
    this.body = {};
    this.command = {};
};

ClippiRequest.prototype.run =  function (callback) {
    // console.log(this);
    const req = https.request(this.options, res => {
        res.setEncoding(this.encoding);
        let raw = '';
        res.on('data', (chunk) => {
            raw += chunk;
        });
        res.on('end', () => {
            callback(null, util.parseJSON(raw));
        });
    }).on('error', (err) => {
        callback(new Error(`Error with request: ${err.message}`));
    });
    if (this.options.method === 'POST' && this.body) {
        req.write(JSON.stringify(this.body));
    }
    req.end();
};

ClippiRequest.prototype.addHeader = function (key, val) {
    this.options.headers.key = val;
};

ClippiRequest.prototype.setContentType = function (val) {
    this.options.headers['Content-Type'] = val;
};

ClippiRequest.prototype.setAuthHeader = function (val) {
    this.options.headers.authorization = val;
};

ClippiRequest.prototype.setEncoding = function (val) {
    this.encoding = val;
};

ClippiRequest.prototype.setBody = function (data) {
    this.body = data;
};

ClippiRequest.prototype.addFieldToBody = function (key, val) {
    this.body.key = val;
};

ClippiRequest.prototype.setCommand = function (cmd) {
    this.command = cmd;
    this.commandString = cmd.name();
};

module.exports = ClippiRequest;
