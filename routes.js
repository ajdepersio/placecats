var express = require('express');
var router = express.Router();

var Site = require('./controllers/site.js');
var Api = require('./controllers/api.js');

router.get('/', Site.getIndex);
router.get('/admin', Site.getAdmin);
router.get('/admin/review', Site.getReview);
router.post('/admin/review/approve', Site.postApprove);

router.get('/random', Api.getRandom);
router.get('/:width/:height', Api.getWidthHeight);
router.get('/:ratio', Api.getRatio);

module.exports = router;