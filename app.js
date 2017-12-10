const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/random', (req, res) => {
    fs.readdir('./images/', (err, files) => {
        var imgCount = files.length;
        //var index = Math.random() * (imgCount - 0) + 0;
        //var index = Math.random(0, imgCount);
        var index = 1;

        var img = files[index];
        res.sendFile('/!_Repos/placecats/images/' + img);
    });
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));