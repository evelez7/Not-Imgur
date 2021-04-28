/**
 * image_post.js
 *
 * Routers for the /image_post endpoint
 */
const express = require('express');
const post = require("../controllers/post.js");
let router = express.Router();

/**
 *
 */
router.get('/:postId', post.retrieve, function(req, res, next) {
  // placeholder for actual post data
  console.log("check: ", req.post.check);
  res.render('main', {
    layout: 'image_post',
    post: {
      title: req.post.title,
      description: req.post.description,
      image: req.post.image
    },
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
