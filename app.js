const express = require('express');
const app = express();
const cats = require('./cats.js');
const config = require('./config.js');

app.get('/random', (req, res) => {
    var index = Math.floor(Math.random() * Object.keys(config.AspectRatio).length);
    var ratio = Object.keys(config.AspectRatio)[index];
    res.sendFile(cats.getCat(ratio.toLowerCase()));
});
app.get('/', (req, res) => {
    res.sendFile(cats.getCat(req.query.ratio));
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));