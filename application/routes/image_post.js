/**
 * image_post.js
 *
 * Routes for the /image_post endpoint
 */
const express = require('express');
const post = require("../controllers/post.js");
const comment = require("../controllers/comment.js");
const user = require("../controllers/user.js");
let router = express.Router();
const { body, validationResult, oneOf } = require('express-validator');

/**
 * GET image_post/:postId
 *
 * Generic route for an image post based on the id
 *
 * Middleware post.retrieve_single, comment.retrieve
 */
router.get('/:postId', post.retrieve_single, comment.retrieve, function (req, res, next)
{
  req.comments.forEach(comment =>
  {
    // Get the author's username based on the comment's authorID
    user.fetch_id(comment["authorID"], (error, result) =>
    {
      comment["author"] = result["name"];
      let datetime_comment = String(comment["date_created"]);
      let datetime_comment_split = datetime_comment.split(" ");
      // parse the comment date into something readable
      comment["date_created"] = datetime_comment_split[1].concat(' ', datetime_comment_split[2], ', ', datetime_comment_split[3]);
    });
  });

  // same thing as the above date but for the post's date
  let datetime_post = String(req.post["date_created"]);
  let datetime_post_split = datetime_post.split(" ");
  req.post["date_created"] = datetime_post_split[1].concat(' ', datetime_post_split[2], ', ', datetime_post_split[3]);

  // fetch the post authorfrom the postID
  user.fetch_id(req.post.userID, (error, result) =>
  {
    req.post["author"] = result["name"];
  });
  // logged in will determine whether or not the modal will prompt authentication on the client
  let logged_in;
  if (req.user) {
    logged_in = true;
  } else {
    logged_in = false;
  }
  res.render('main', {
    layout: 'image_post',
    post: req.post,
    comments: req.comments,
    // decide which navbar will be rendered
    which_navbar: () =>
    {
      if (req.user) {
        return "navbar_authenticated";
      } else {
        return "navbar_unauthenticated";
      }
    },
    // determines whether modals are shown on comment submission
    logged_in: logged_in
  });
});

/**
 * POST image_post/:postId/comment
 *
 * Submits a comment submitted for a user
 * Determines whether authenticaion is needed for the comment
 */
router.post('/:postId/comment',
  body("comment").notEmpty().trim().escape(),
  function (req, res, next)
  {
    if (req.user) {
      // if logged in, submit comment
      comment.submit(req.body.comment, req.params.postId, req.user.id);
      res.redirect(302, '/image_post/' + req.params.postId);
    } else {
      // this section is actually currently not used, as registration is not allowed
      let comment = req.body.comment;
      let uri_comment = encodeURIComponent(comment);
      res.redirect(302, '/register?comment=' + uri_comment);
    }
  });

module.exports = router;
