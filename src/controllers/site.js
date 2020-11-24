const log = require('../utilities/log.js');

module.exports = {
    getIndex: (req, res) => {
        log.logRequest(req);
        res.sendFile('index.html');
    }
}