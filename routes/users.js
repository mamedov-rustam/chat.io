var express = require('express');
var router = express.Router();
var db = require('../data/db');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send(db.findAllOnlineUsers());
});

module.exports = router;
