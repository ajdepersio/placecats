var express = require('express');
var router = express.Router();

var site = require('./controllers/site.js');
var admin = require('./controllers/admin.js');
var api = require('./controllers/api.js');

//Website endpoints
router.get('/', site.getIndex);

//Admin endpoints
router.get('/admin', admin.getAdmin);
router.get('/admin/review', admin.getReview);
router.post('/admin/review/approve', admin.postApprove);

//API endpoints
router.get('/random', api.getRandom);
router.get('/:width/:height', api.getWidthHeight);
router.get('/:ratio', api.getRatio);

module.exports = router;