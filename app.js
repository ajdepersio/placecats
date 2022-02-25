const express = require('express');
const serveIndex = require('serve-index');
const app = express();
const cats = require('./cats.js');
const ratioHelper = require('./ratio-helper.js');
const config = require('./config.js');
const path = require('path');
const fs = require('fs');
const https = require('https');

var logIp = function (req) {
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

app.use(express.static('site/public'));
app.use('/.well-known', express.static('.well-known'), serveIndex('.well-known'));

//Website Endpoints
app.get('/', (req, res) => {
    logIp(req);
    if (req.query.ratio) {
        res.sendFile(cats.getCat(req.query.ratio));
    } else if (req.query.width && req.query.height) {
        res.sendFile(cats.getCatOfDimension(req.query.width, req.query.height));
    } else {
        res.sendFile('index.html');
    }
});

app.get('/admin', (req, res) => {
    logIp(req);
    if (req.query.key === config.AdminKey) {
        res.sendFile(process.cwd() + '/site/private/index.html');
    } else {
        res.sendStatus(401);
    }
});

app.get('/admin/review', (req, res) => {
    logIp(req);
    if (req.query.key === config.AdminKey) {
        res.send(cats.getCatsForReview());
    } else {
        res.sendStatus(401);
    }
});

app.post('/admin/review/approve', (req, res) => {
    logIp(req);
    if (req.query.key === config.AdminKey) {
        var fileName = process.cwd() + '/site/public/assets/review/' + req.body.fileName;
        var ratio = req.body.ratio;
        if (!ratioHelper.validateRatio(ratio)) {
            res.sendStatus(404);
        } else {
            var ratioObj = config.ratio.keys(ratio);
            cats.getCatOfDimension(fileName, ratioObj.exWidth, ratioObj.exHeight, ratio);
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(401);
    }
});

//API Endpoints
app.get('/random', (req, res) => {
    logIp(req);
    res.sendFile(cats.getRandom());
});

app.get('/:width/:height', (req, res) => {
    var width = req.params.width;
    var height = req.params.height;

    logIp(req);
    if (isNaN(width) || isNaN(height)) {
        res.sendStatus(404);
    } else {
        var ratio = ratioHelper.getNearestRatio(width, height);
        //Get a file name similar to how getRandom works
        var baseCat = cats.getCat(ratio.name);
        var catFile = path.basename(baseCat);
        var catFilePath = process.cwd() + '/images/' + width + '/' + height + '/' + catFile;
        if (fs.existsSync(catFilePath)) {
            res.sendFile(process.cwd() + '/images/' + width + '/' + height + '/' + catFile);
        }
        cats.getCatOfDimension(baseCat, req.params.width, req.params.height)
            .then(function (data) {
                res.sendFile(process.cwd() + '/images/' + width + '/' + height + '/' + catFile);
            });
    }

});

app.get('/:ratio', (req, res) => {
    logIp(req);
    var ratio = req.params.ratio;
    if (!ratioHelper.validateRatio(ratio)) {
        res.sendStatus(404);
    } else {
        res.sendFile(cats.getCat(ratio.toLowerCase()));
    }
});

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
