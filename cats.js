const fs = require('fs');
const config = require('./config.js');
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
    return (process.cwd() + '/images/' + ratio + '/' + files[index]);
};

var getCatOfDimension = function(masterFilePath, width, height, outputFolder) {
    var fileName = path.basename(masterFilePath);
    var outputFile = __dirname + '/images/';

    if (outputFolder) {
        outputFile += outputFolder;
    } else {
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
        outputFile += width + '/' + height;
    }
    outputFile += '/' + fileName;

    return sharp(masterFilePath)
        .resize(parseInt(width), parseInt(height))
        .toFile(outputFile, null);
};

module.exports = {
    getRandom: getRandom,
    getCat: getCat,
    getCatOfDimension: getCatOfDimension
};