const express = require('express');
const app = express();
const cats = require('./cats.js');
const ratioHelper = require('./ratio-helper.js');
const config = require('./config.js');
const path = require('path');
const fs = require('fs');

var logIp = function(req) {
    try {
        var url = req.url;
        var ip = req.connection.remoteAddress;
        var proxy = req.headers['x-forwarded-for'];

        fs.exists("./log.csv", function(exists) {
            if (!exists) {
                fs.appendFile("./log.csv", "URL,IP,Proxy", function(error) { 
                    fs.appendFile("./log.csv", "\n" + url + "," + ip + "," + proxy, function(error) { });
                });
            } else {
                fs.appendFile("./log.csv", "\n" + url + "," + ip + "," + proxy, function(error) { });
            }
        });
    } catch (error) {
        console.error(error);
    }
};

app.use(express.static('site/public'));

app.get('/random', (req, res) => {
    logIp(req);
    res.sendFile(cats.getRandom());
});
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
  if (req.query.key === config.AdminKey) {
    res.sendFile(process.cwd() + '/site/private/index.html');
  } else {
      res.sendStatus(401);
  }
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
    //Check that request is valid
    var valid = false;
    var validRatios = Object.getOwnPropertyNames(config.AspectRatios);
    var ratio = req.params.ratio;
    validRatios.forEach(function(validRatio) {
        if (ratio.toUpperCase() == validRatio.toUpperCase()) {
            valid = true;
        }
    }, this);
    if (!valid) {
        res.sendStatus(404);
    } else {
        res.sendFile(cats.getCat(ratio.toLowerCase()));
    }
});

app.listen(3000, () => console.log('Placecats is running at http://localhost:3000'));
