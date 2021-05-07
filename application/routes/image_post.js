/**
 * image_post.js
 *
 * Routers for the /image_post endpoint
 */
const express = require('express');
const post = require("../controllers/post.js");
const comment = require("../controllers/comment.js");
let router = express.Router();

/**
 *
 */
router.get('/:postId', post.retrieve_single, comment.retrieve, function(req, res, next) {
  let logged_in;
  if (req.user) logged_in = true;
  else logged_in = false;
  res.render('main', {
    layout: 'image_post',
    post: {
      title: req.post.title,
      description: req.post.description,
      image: "/" + req.post.image, // pre-append / so the html uses absolute path to upload dir
      id: req.post.id
    },
    comments: req.comments,
    which_navbar: () => {
      if (req.user)
      {
        return "navbar_authenticated";
      } else
      {
        return "navbar_unauthenticated";
      }
    },
    logged_in: logged_in
  });
});

router.post('/:postId/comment', function(req, res, next) {
  if (req.user) {
    // post.comment(req.param.id);
  } else {
    let comment = req.body.comment;
    console.log(comment);
    let uri_comment = encodeURIComponent(comment);
    res.redirect(302, '/register?comment=' + uri_comment);
  }
});

module.exports = router;
