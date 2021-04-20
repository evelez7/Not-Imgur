
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.sendFile('registration.html');
  res.render('main', {layout: 'registration'});
});

module.exports = router;
