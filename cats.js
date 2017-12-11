const fs = require('fs');

module.exports = {
    getRandom: () => {
        var files = fs.readdirSync('./images/');
        var index = Math.floor(Math.random() * files.length);
        return ('/!_Repos/placecats/images/' + files[index]);
    },

    getCat: (ratio) => {
        var files = fs.readdirSync('./images/' + ratio + '/');
        var index = Math.floor(Math.random() * files.length);
        return ('/!_Repos/placecats/images/' + ratio + '/' + files[index]);
    }
};