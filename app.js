const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const config = require('./config.js');

var router = require('./src/routes.js');

app.use(express.static('site/public'));
app.use('/', router);

//Start Webserver
if (config.Debug) {
    app.listen(config.httpPort, () => console.log('Placecats is running at http://localhost:' + config.httpPort.toString()));
} else {
    var server = https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app);

    server.listen(config.httpsPort, () => console.log('Placecats is running at https://localhost:' + config.httpsPort.toString()));
}