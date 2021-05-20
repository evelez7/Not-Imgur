/**
 * register.js
 *
 * Routes for the /register endpoint
 */
var express = require('express');
var router = express.Router();
const comment = require("../controllers/comment.js");
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const user = require('../controllers/user.js');

/**
 * GET register/
 */
router.get('/', function (req, res, next)
{
  if (req.query.comment) {
    // currently unused as registering from a post is not supported
    comment_temp = req.query.comment;
    res.render('main', { layout: 'register' });
  } else {
    // might come from a context where logged in, but wandered to registration page
    if (req.user) { res.redirect(302, '/'); }
    // render registration with no intent to submit comment
    res.render('main', { layout: 'register' });
  }
});

/**
 * POST register/submit
 */
router.post('/submit',
  body("username").trim(),
  body('email').isEmail().normalizeEmail(),
  body('password').matches('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[/\*-+!@#\$\^&]).*').withMessage('Must match regex!').custom((value, { req }) =>
  {
    if (value != req.body.confirm_password) {
      throw new Error("Password confirmation does not match password!");
    }

    return true;
  }),
  function (req, res, next)
  {
    let validation_errors = validationResult(req);
    if (!validation_errors.isEmpty()) {
      res.status(400).json({ errors: validation_errors.array() });
      return;
    }
    user.register(req, res, next);
    res.redirect(302, '/login');
  });

module.exports = router;
