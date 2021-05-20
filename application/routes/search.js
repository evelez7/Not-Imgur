/**
 * search.js
 *
 * Routes for the /search endpoint
 */
const express = require('express');
const post = require('../controllers/post.js');
let router = express.Router();
const { body } = require('express-validator');

/**
 * POST search/
 *
 * Middleware post.retrieve_search
 */
router.post('/',
  // you are allowed to search for nothing, which is everything
  body("search_term").trim().isLength({min: 1}),
  post.retrieve_search, (req, res, next) => {
  res.render('main', {
    layout: 'results',
    // posts: JSON.parse(JSON.stringify(req.posts).replace(/&quot;/g,'"')),
    posts: req.posts,
    query: req.body.search_term,
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