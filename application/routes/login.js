var express = require('express');
const comment = require('../controllers/comment.js');
const { register } = require('../controllers/user.js');
var router = express.Router();
const passport = require("../middleware/passport.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) { res.redirect(302, '/') };
  res.render('main', {
    layout: 'login',
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

router.post('/',
  passport.authenticate('local',
  {
    failureRedirect: '/login',
    failureFlash: true
  }), (req, res, next) =>
  {
    comment.submit(req.body.comment, req.body.postId, req.user.id);
    res.redirect(302, '/image_post/' + req.body.postId);
  });


module.exports = router;
