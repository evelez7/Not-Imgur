var express = require('express');
var router = express.Router();
const passport = require("../middleware/passport.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', {layout: 'login'});
});

router.post('/', function(req, res, next) {
  res.redirect(302, '/');
});

router.post('/submit',
  passport.authenticate('local', {failureRedirect: '/login' }),
  (req, res, next) => {
    res.redirect(302, '/');
});

module.exports = router;
