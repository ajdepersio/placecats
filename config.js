module.exports = {
    AdminKey : '',
    httpPort: 3000,
    httpsPort: 3001,
    AspectRatios : {
        Square : {
            name : 'square',
            width : 1,
            height : 1,
            exWidth : 1000,
            exHeight: 1000
        },
        Standard : {
            name : 'standard',
            width: 4,
            height: 3,
            exWidth : 1200,
            exHeight: 900
        },
        Wide : {
            name : 'wide',
            width : 16,
            height : 9,
            exWidth : 1920,
            exHeight: 1080
        },
        Tall : {
            name : 'tall',
            width : 9,
            height : 16,
            exWidth : 1080,
            exHeight: 1920
        },
        Panorama : {
            name : 'panorama',
            width : 3,
            height : 1,
            exWidth : 1200,
            exHeight: 300
        }
    }
};
