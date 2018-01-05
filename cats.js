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

var getCatOfDimension = function(width, height) {
    //Calculate nearest aspect ratio 
    var ratio = ratioHelper.getNearestRatio(width, height);
    //Get a file name similar to how getRandom works
    var masterFile = getCat(ratio);
    //Check if this image has already been sized to the requested dimensions
    //  if yes, return it
    //  if no, create the image
};

var resizeImageSync = function(masterFilePath, width, height) {
    var done = false;
    var _self = this;
    _self.done = done;

    var fileName = path.basename(masterFilePath);
    sharp(masterFilePath)
        .resize(width, height)
        .toFile(__dirname + '/images/' + width + '/' + height + '/' + fileName, function(err, info) {
            if (!err) {
                _self.done = true;
            }
        });
    
}

module.exports = {
    getRandom: getRandom,
    getCat: getCat,
    getCatOfDimension: getCatOfDimension
};