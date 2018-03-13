const express = require('express');
const app = express();
const cats = require('./cats.js');
const ratioHelper = require('./ratio-helper.js');
const config = require('./config.js');
const path = require('path');
const fs = require('fs');

app.get('/random', (req, res) => {
    res.sendFile(cats.getRandom());
});
app.get('/', (req, res) => {
    if (req.query.ratio) {
        res.sendFile(cats.getCat(req.query.ratio));
    } else if (req.query.width && req.query.height) {
        res.sendFile(cats.getCatOfDimension(req.query.width, req.query.height));
    } else {
        res.sendFile('/!_Repos/placecats/index.html');
    }
});
app.get('/:width/:height', (req, res) => {
    var width = req.params.width;
    var height = req.params.height;
    var ratio = ratioHelper.getNearestRatio(width, height);
    //Get a file name similar to how getRandom works
    var baseCat = cats.getCat(ratio.name);
    var catFile = path.basename(baseCat);
    var catFilePath = config.BaseImageStore + width + '/' + height + '/' + catFile;
    if (fs.existsSync(catFilePath)) {
        res.sendFile(catFilePath);
    }
    cats.getCatOfDimension(baseCat, req.params.width, req.params.height)
      .then(function (data) {
          console.log(catFilePath);
          console.log(catFile);
          console.log(baseCat);
          res.sendFile('/!_Repos/placecats/images/' + width + '/' + height + '/' + catFile);
      });

    //res.sendFile(cats.getCatOfDimension(baseCat, req.params.width, req.params.height));
});
app.get('/:ratio', (req, res) => {
    res.sendFile(cats.getCat(req.params.ratio));
});

app.listen(3000, () => console.log('Placecats is running at http://localhost:3000'));