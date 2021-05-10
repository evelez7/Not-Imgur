const express = require('express');
const post = require('../controllers/post.js');
let router = express.Router();

router.post('/', post.retrieve_search, (req, res, next) => {
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