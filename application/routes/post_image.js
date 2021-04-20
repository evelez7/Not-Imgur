
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.sendFile('post_image.html');
  res.render('main', {layout: 'post_image'});
});

module.exports = router;
