var express = require('express');
var router = express.Router();
const users = require("../controllers/user.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) { res.redirect(302, '/'); }
  res.render('main', {layout: 'register'});
});

router.post('/submit', users.register, function(req, res, next) {
  res.redirect(302, '/login');
});

module.exports = router;
