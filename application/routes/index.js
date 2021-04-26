var express = require('express');
var router = express.Router();
let users = require('../controllers/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', {layout: 'home'});
});

module.exports = router;
