const express = require('express');
const post = require("../controllers/post.js");
let router = express.Router();

/**
 * GET router for home page (index)
 *
 * Will ask for images to load
 */
router.get('/', post.retrieve, function(req, res, next) {
  console.log("array type: ", req.posts[0]);
  res.render('main', {
    layout: 'index',
    // posts: JSON.parse(JSON.stringify(req.posts).replace(/&quot;/g,'"')),
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
