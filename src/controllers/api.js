const fs = require('fs');
const path = require('path');

const cats = require('../cats.js');
const log = require('../utilities/log.js');
const ratioHelper = require('../utilities/ratio-helper.js');

module.exports = {
    getRandom: (req, res) => {
        log.logRequest(req);
        res.sendFile(cats.getRandom());
    },

    getWidthHeight: (req, res) => {
        var width = req.params.width;
        var height = req.params.height;

        log.logRequest(req);
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
    },

    getRatio: (req, res) => {
        log.logRequest(req);
        var ratio = req.params.ratio;
        if (!ratioHelper.validateRatio(ratio)) {
            res.sendStatus(404);
        } else {
            res.sendFile(cats.getCat(ratio.toLowerCase()));
        }
    }
}