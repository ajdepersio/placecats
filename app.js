const express = require('express');
const app = express();
const cats = require('./cats.js')

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/random', (req, res) => {
    res.sendFile(cats.getRandom());
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));