var express = require('express');
var router = express.Router();
const users = require("../controllers/user.js");

// globals are bad
let comment = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.comment)
  {
    comment = req.query.comment;
    res.render('main', {layout: 'register'});
  } else {
    // might come from a context where logged in, but wandered to registration page
    if (req.user) { res.redirect(302, '/'); }
    // render registration with no intent to submit comment
    res.render('main', {layout: 'register'});
  }
});

router.post('/submit', users.register, function(req, res, next) {
  res.redirect(302, '/login');
});

router.post('/', users.register, function(req, res, next)
{
});

module.exports = router;
