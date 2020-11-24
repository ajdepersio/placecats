const fs = require('fs');

var logRequest = function (req) {
    try {
        var url = req.url;
        var ip = req.connection.remoteAddress;
        var proxy = req.headers['x-forwarded-for'];

        fs.exists("./http-log.csv", function (exists) {
            if (!exists) {
                fs.appendFile("./http-log.csv", "URL,IP,Proxy", function (error) {
                    fs.appendFile("./http-log.csv", "\n" + url + "," + ip + "," + proxy, function (error) { });
                });
            } else {
                fs.appendFile("./http-log.csv", "\n" + url + "," + ip + "," + proxy, function (error) { });
            }
        });
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    logRequest: logRequest
};