var express = require('express');
var router = express.Router();
const users = require("../controllers/user.js");
const comment = require("../controllers/comment.js");
const passport = require('passport');
const { body, validationResult } = require('express-validator');

// globals are bad
let comment_temp = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.comment)
  {
    comment_temp = req.query.comment;
    res.render('main', {layout: 'register'});
  } else {
    // might come from a context where logged in, but wandered to registration page
    if (req.user) { res.redirect(302, '/'); }
    // render registration with no intent to submit comment
    res.render('main', {layout: 'register'});
  }
});

router.post('/submit',
  body('email').isEmail(),
  body('password').matches('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[/\*-+!@#\$\^&]).*').withMessage('Must match regex!'),
  users.register,
  function(req, res, next) {
    let validation_errors = validationResult(req);
    if (!validation_errors.isEmpty())
    {
      res.status(400).json({ errors : validation_errors.array() });
    }

    res.redirect(302, '/login');
});

router.post('/', users.register, passport.authenticate('local',
{
  failureRedirect: '/register',
  failureFlash: true
}), (req, res, next) => {
  comment.submit(req.body.comment, req.body.postId, req.user.id)
  res.redirect(302, '/image_post/' + req.body.postId);
});

module.exports = router;
