/**
 * index.js
 *
 * Routes for the / endpoint
 */
const express = require('express');
const post = require("../controllers/post.js");
const passport = require("../middleware/passport.js");
let router = express.Router();

/**
 * GET /
 *
 * Will ask for images to load
 */
router.get('/', post.retrieve,
function(req, res, next) {
  res.render('main', {
    layout: 'index',
    posts: req.posts,
    which_navbar: () => {
      if (req.user)
      {
        return "navbar_authenticated";
      } else
      {
        return "navbar_unauthenticated";
      }
    }
  });
});

module.exports = router;
