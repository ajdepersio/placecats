const config = require('./config.js');

module.exports = {
    getNearestRatio : (width, height) => {
        var results = config.AspectRatios.Standard;
        var inRatio = width / height;
        
        var ratios = Object.keys(config.AspectRatios);
        
        //an incredibly high number, hopefully someone won't try to request a picture with this ration
        //if so, stop breaking the law!!
        var delta = 100000000.0;
        var normRatio;
        
        console.log(ratios);
        var ratio;
        for (var i = 0; i < ratios.length; i++) {
            ratio = config.AspectRatios[ratios[i]];
            normRatio = ratio.width / ratio.height;
            console.log(ratio.name + ': ' + normRatio);
            if (Math.abs(normRatio - inRatio) < delta) {
                delta = Math.abs(normRatio - inRatio);
                results = ratio;
            }
        }
        return results;
    }
}

