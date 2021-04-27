var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) { res.redirect(302, '/'); }
  res.render('main', {layout: 'register'});
});

router.post('/submit',  function(req, res, next) {
  res.redirect(302, '/');
});

module.exports = router;
