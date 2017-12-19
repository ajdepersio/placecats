const fs = require('fs');

module.exports = {
    getRandom: () => {
        var index = Math.floor(Math.random() * Object.keys(config.AspectRatios).length);
        var ratio = Object.keys(config.AspectRatios)[index];
        return (getCat(ratio.toLowerCase()));
    },

    getCat: (ratio) => {
        var files = fs.readdirSync('./images/' + ratio + '/');
        var index = Math.floor(Math.random() * files.length);
        return ('/!_Repos/placecats/images/' + ratio + '/' + files[index]);
    },

    getCatOfDimension: (width, height) => {
        //Calculate nearest aspect ratio 
        var ratio = ratioHelper.getNearestRatio(width, height);
        //Get a file name similar to how getRandom works
        //Check if this image has already been sized to the requested dimensions
        //  if yes, return it
        //  if no, create the image
    }
};