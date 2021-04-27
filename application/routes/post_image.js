var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main',
  {
    layout: 'post_image',
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
