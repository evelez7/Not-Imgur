var express = require('express');
var router = express.Router();
const passport = require("../middleware/passport.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) { res.redirect(302, '/') };
  res.render('main', {
    layout: 'login'
  });
});

/**
 * Router for the submission of the login form
 *
 * Calls the authenticate mdidleware from Passport
 */
router.post('/submit',
  passport.authenticate('local',
  {
    failureRedirect: '/login',
    failureFlash: true
  }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
