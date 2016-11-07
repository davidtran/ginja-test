var express = require('express');
var router = express.Router();
var oauth = require('./oauth');
var vendor = require('./vendor');

module.exports = router;

router.use('/vendor', vendor);
router.use('/oauth', oauth);