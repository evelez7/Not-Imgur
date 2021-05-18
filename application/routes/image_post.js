/**
 * image_post.js
 *
 * Routers for the /image_post endpoint
 */
const express = require('express');
const post = require("../controllers/post.js");
const comment = require("../controllers/comment.js");
const user = require("../controllers/user.js");
const passport = require("../middleware/passport.js");
let router = express.Router();

/**
 *
 */
router.get('/:postId', post.retrieve_single, comment.retrieve, function(req, res, next) {
  req.comments.forEach(comment => {
    user.fetch_id(comment["authorID"], (error, result) =>  {
      comment["author"] = result["name"];
      let datetime_comment = String(comment["date_created"]);
      let datetime_comment_split = datetime_comment.split(" ");
      comment["date_created"] = datetime_comment_split[1].concat(' ', datetime_comment_split[2], ', ', datetime_comment_split[3]);
    });
  });

  let datetime_post = String(req.post["date_created"]);
  let datetime_post_split = datetime_post.split(" ");
  req.post["date_created"] = datetime_post_split[1].concat(' ', datetime_post_split[2], ', ', datetime_post_split[3]);

  user.fetch_id(req.post.userID, (error, result) => {
    req.post["author"] = result["name"];
  });
  let logged_in;
  if (req.user)
  {
    logged_in = true;
  } else
  {
    logged_in = false;
  }
  res.render('main', {
    layout: 'image_post',
    post: req.post,
    comments: req.comments,
    which_navbar: () => { // decide which navbar will be rendered
      if (req.user)
      {
        return "navbar_authenticated";
      } else
      {
        return "navbar_unauthenticated";
      }
    },
    logged_in: logged_in // determines whether modals are shown on comment submission
  });
});

router.post('/:postId/comment',
  function(req, res, next) {
  if (req.user) {
    comment.submit(req.body.comment, req.params.postId, req.user.id);
    res.redirect(302, '/image_post/' + req.params.postId);
  } else {
    let comment = req.body.comment;
    let uri_comment = encodeURIComponent(comment);
    res.redirect(302, '/register?comment=' + uri_comment);
  }
});

module.exports = router;
