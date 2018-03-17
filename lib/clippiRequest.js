const url = require('url');
const http = require('http');

// ClippiRequest class
var ClippiRequest = function (options) {
    this.options = initOptions(options);
    this.encoding = 'utf8';
};

ClippiRequest.prototype.run =  function (callback) {
    const req = http.request(this.options, res => {
        res.setEncoding(this.encoding);
        let raw = '';
        res.on('data', (chunk) => {
            raw += chunk;
        });
        res.on('end', () => {
            callback(null, JSON.parse(raw));
        });
    }).on('error', (err) => {
        callback(new Error(`Error with request: ${err.message}`));
    });
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

function initOptions(options) {
    let res = {};
    if (typeof options === 'string') {
        // If only a url is passed, use default get request
        let _url = url.parse(options);
        res = {
            hostname: _url.hostname,
            port: _url.port,
            path: _url.pathname,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } else  {
        res = options;
    }
    return res;
}

module.exports = ClippiRequest;

