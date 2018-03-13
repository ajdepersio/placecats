const fs = require('fs');
const config = require('./config.js');
const ratioHelper = require('./ratio-helper.js');
const sharp = require('sharp');
const path = require('path');

var getRandom = function() {
    var index = Math.floor(Math.random() * Object.keys(config.AspectRatios).length);
    var ratio = Object.keys(config.AspectRatios)[index];
    return (getCat(ratio.toLowerCase()));
};

var getCat = function(ratio) {
    var files = fs.readdirSync('./images/' + ratio + '/');
    var index = Math.floor(Math.random() * files.length);
    return ('/!_Repos/placecats/images/' + ratio + '/' + files[index]);
};

// var getCatOfDimension = function(width, height) {
//     var ratio = ratioHelper.getNearestRatio(width, height);
//     var baseCat = getCat(ratio.name);
//     return resizeImage(baseCat, parseInt(width), parseInt(height));
// };

var getCatOfDimension = function(masterFilePath, width, height) {
    //Make the directory if not exist
    try {
        fs.mkdirSync(path.resolve('./images/' + width));
    } catch (error) {
        if (error.code !== 'EEXIST') throw error;
    }
    try {
        fs.mkdirSync(path.resolve('./images/' + width + '/' + height));
    } catch (error) {
        if (error.code !== 'EEXIST') throw error;
    }

    var fileName = path.basename(masterFilePath);
    return sharp(masterFilePath)
        .resize(parseInt(width), parseInt(height))
        .toFile(__dirname + '/images/' + width + '/' + height + '/' + fileName, null);
};

module.exports = {
    getRandom: getRandom,
    getCat: getCat,
    getCatOfDimension: getCatOfDimension
};