const express = require('express');
const app = express();
const cats = require('./cats.js');
const ratioHelper = require('./ratio-helper.js');
const config = require('./config.js');

app.get('/random', (req, res) => {
    res.sendFile(cats.getRandom());
});
app.get('/', (req, res) => {
    if (req.query.ratio) {
        res.sendFile(cats.getCat(req.query.ratio));
    } else if (req.query.width && req.query.height) {
        res.sendFile(cats.getCatOfDimension(req.query.width, req.query.height));
    } else {
        res.sendFile('/!_Repos/placecats/index.html');
    }
});
app.get('/:width/:height', (req, res) => {
    res.sendFile(cats.getCatOfDimension(req.params.width, req.params.height));
});


app.listen(3000, () => console.log('Placecats is running at http://localhost:3000'));