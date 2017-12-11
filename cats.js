const fs = require('fs');

module.exports = {
    getRandom: () => {
        var files = fs.readdirSync('./images/');
        var index = Math.floor(Math.random() * files.length);
        return ('/!_Repos/placecats/images/' + files[index]);
    }
};