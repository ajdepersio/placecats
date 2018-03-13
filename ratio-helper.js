const config = require('./config.js');

module.exports = {
    getNearestRatio : (width, height) => {
        var results = config.AspectRatios.Standard;
        var inRatio = width / height;
        
        var ratios = Object.keys(config.AspectRatios);
        
        var delta = Math.max() * -1;
        var normRatio;
        
        var ratio;
        for (var i = 0; i < ratios.length; i++) {
            ratio = config.AspectRatios[ratios[i]];
            normRatio = ratio.width / ratio.height;
            if (Math.abs(normRatio - inRatio) < delta) {
                delta = Math.abs(normRatio - inRatio);
                results = ratio;
            }
        }
        return results;
    }
}

