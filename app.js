const express = require('express');
const app = express();
const cats = require('./cats.js');
const ratioHelper = require('./ratio-helper.js');
const config = require('./config.js');

app.get('/random', (req, res) => {
    var index = Math.floor(Math.random() * Object.keys(config.AspectRatios).length);
    var ratio = Object.keys(config.AspectRatios)[index];
    res.sendFile(cats.getCat(ratio.toLowerCase()));
});
app.get('/', (req, res) => {
    if (req.query.ratio) {
        res.sendFile(cats.getCat(req.query.ratio));
    } else {
        res.sendFile('/!_Repos/placecats/index.html');
    }
});
app.get('/:width/:height', (req, res) => {
    var width = req.params.width;
    var height = req.params.height;
    var ratio = ratioHelper.getNearestRatio(width, height);

    console.log(ratio);
});


app.listen(3000, () => console.log('Placecats is running at http://localhost:3000'));