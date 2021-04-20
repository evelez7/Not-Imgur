var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.sendFile('login.html', {root: "public"});
  res.render('main', {layout: 'login'});
});

router.post('/', function(req, res, next) {
  res.redirect(302, '/');
});

router.post('/submit', function(req, res, next) {
  console.log("hello");
  res.redirect(302, '/');
});

module.exports = router;
