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
const { v1: uuidv1 } = require('uuid');
let router = express.Router();
const { body, validationResult, oneOf } = require('express-validator');

/**
 * Initialize multer for recieving images
 *
 * dest is the temporary directory for file storage
 * They should be moved to /upload once verified
 */
const uploader = multer({
  dest: "upload/temp" // throws error with a starting "/" (?)
});

/**
 * GET /image_post
 */
router.get('/', function (req, res, next)
{
  if (!req.user) { res.redirect(302, '/'); };
  console.log("user: ",req.user);
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
 * POST  /login/submit
 */
router.post('/submit',
  body("title").trim().isEmpty().isLength({min: 8}).bail(),
  body("description").trim().isEmpty().isLength({min: 4}).bail(),
  uploader.single("image"),

  (req, res, next) =>
  {
    const validation_errors = validationResult(req);
    if (!validation_errors.isEmpty())
    {
      console.log("Bad validation!");
      return done(null, false, {message: "Bad info"});
    }
    if (!req.user) { // should not be allowed to submit if not logged in
      res.redirect(302, '/');
      // should redirect to an unauthorized page
    }

    const temp_path = req.file.path;
    const new_image_name = uuidv1(); // uuidv1 is based off of timestamp and MAC address
    const target_path = "upload/".concat(new_image_name); // does not work with starting / (?)

    fs.rename(temp_path, target_path, err =>
      {
        if (err) console.log("RENAME: ", err);
      });

    post.post(req, target_path, (error, post_id) =>
    {
      if (error) {
        console.log("AFTER POST: ", error);
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
