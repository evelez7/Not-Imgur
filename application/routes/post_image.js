/**
 * post_image,js
 *
 * Routers for the /post_image endpoint
 *
 * This endpoint serves for authenticated users to submit posts.
 * A post consists of an image, title, and description
 */
const express = require('express');
const post = require("../controllers/post.js");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
let router = express.Router();

const uploader = multer({
  dest: "../uploaded/temp"
});

/**
 * GET request for /image_post
 */
router.get('/', function (req, res, next)
{
  if (!req.user) { res.redirect(302, '/'); };
  res.render('main',
    {
      layout: 'post_image',
      which_navbar: () =>
      {
        if (req.user) {
          return "navbar_authenticated";
        } else {
          return "navbar_unauthenticated";
        }
      }
    });
});

/**
 * POST request for /login/submit
 */
router.post('/submit',
  uploader.single("image"),

  (req, res, next) =>
  {
    if (!req.user) { // should not be allowed to submit if not logged in
      res.redirect(302, '/');
      // should redirect to an unauthorized page
    }

    const temp_path = req.file.path;
    const target_path = path.join(__dirname, "../uploaded/image.png");

    fs.rename(temp_path, target_path, err =>
      {
        if (err) console.log(err);
        req.file.path = target_path;
      });

    post.post(req, (error, post_id) =>
    {
      if (error) {
        // need to throw an error here, or from caller
      }

      if (post_id) {
        // id is not null, redirect to new post
        res.redirect(302, '/image_post/'.concat(post_id));
      } else
      {
        res.redirect(404, '/');
      }
    });
});

module.exports = router;
