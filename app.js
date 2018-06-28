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

        fs.appendFile("./log", "\n" + url + "," + ip + "," + proxy);
    } catch (error) {
        console.error(error);
    }
};

app.use(express.static('site'));

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
        res.sendFile('/!_Repos/placecats/site/index.html');
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
        var catFilePath = config.BaseImageStore + width + '/' + height + '/' + catFile;
        if (fs.existsSync(catFilePath)) {
            res.sendFile('/!_Repos/placecats/images/' + width + '/' + height + '/' + catFile);
        }
        cats.getCatOfDimension(baseCat, req.params.width, req.params.height)
        .then(function (data) {
            res.sendFile('/!_Repos/placecats/images/' + width + '/' + height + '/' + catFile);
        });
    }

});
app.get('/:ratio', (req, res) => {
    logIp(req);
    res.sendFile(cats.getCat(req.params.ratio));
});

app.listen(3000, () => console.log('Placecats is running at http://localhost:3000'));