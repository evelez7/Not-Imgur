
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.sendFile('registration.html');
  console.log("GET /register");
  res.render('main', {layout: 'register'});
});

router.post('/submit', function(req, res, next) {
  console.log("POST /register/submit");
  res.redirect(302, '/');
});

module.exports = router;
