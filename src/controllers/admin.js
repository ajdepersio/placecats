const config = require('../../config.js');
const cats = require('../cats.js');
const log = require('../utilities/log.js');

module.exports = {
    getAdmin: (req, res) => {
        log.logRequest(req);
        if (req.query.key === config.AdminKey) {
            res.sendFile(process.cwd() + '/site/private/index.html');
        } else {
            res.sendStatus(401);
        }
    },

    getReview: (req, res) => {
        log.logRequest(req);
        if (req.query.key === config.AdminKey) {
            res.send(cats.getCatsForReview());
        } else {
            res.sendStatus(401);
        }
    },

    postApprove: (req, res) => {
        log.logRequest(req);
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
    }
}