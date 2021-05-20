/**
 * logout.js
 *
 * Routes for the /logout endpoint
 */
const express = require("express");
let router = express.Router();

/**
 * GET logout/
 *
 * Log the user oute using the user object
 * The user object is created by Passport
 */
router.get('/', (req, res, next) =>
{
  req.logout();
  res.redirect(302, '/');
});

module.exports = router;