const express = require("express");
let router = express.Router();

router.get('/', (req, res, next) =>
{
  req.logout();
  res.redirect(302, '/');
});

module.exports = router;