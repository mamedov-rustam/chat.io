var express = require('express');
var router = express.Router();
var events = require('../socket.io/events');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render("index");
});

module.exports = router;
