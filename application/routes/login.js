/**
 * router/login.js
 *
 * Contains all route information for login.js
 *
 * NOTE: email/password are checked here, but bad validation
 * is not acted upon until req is passed to Passport in the Strategy declaration
 */
var express = require('express');
const comment = require('../controllers/comment.js');
const { register } = require('../controllers/user.js');
var router = express.Router();
const passport = require("../middleware/passport.js");
const { body, validationResult, oneOf } = require('express-validator');

/* GET home page. */
router.get('/', function (req, res, next)
{
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
  body('password').matches("^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[/\*-+!@#\$\^&]).*"),
  body('email').isEmail(),
  passport.authenticate('local',
    {
      failureRedirect: '/login',
      failureFlash: true,
      successRedirect: '/'
    })
);

router.post('/',
  body('password').matches("^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[/\*-+!@#\$\^&]).*"),
  body('email').isEmail(),
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
