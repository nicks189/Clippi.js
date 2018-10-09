exports.parseJSON = function (data) {
    try {
        return JSON.parse(data);
    } catch (err) {
        return data;
    }
};

exports.buildCommandString = function (cmd, fields) {
    if (fields) {
        fields.forEach((field) => {
            cmd += (" <" + field + ">");
        });
    }
    return cmd;
};

exports.buildReqOptions = function (options) {
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
};
