var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // placeholder for actual post data
  res.render('main', {
    layout: 'image_post',
    post: {
      title: "Example title",
      description: "Example description",
      image: "url"
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
