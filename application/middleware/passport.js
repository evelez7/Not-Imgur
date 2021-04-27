/**
 * Passport.js
 *
 * A config file for the Passport authentication middleware
 *
 * Strategies, deserialization/serialization functions, etc should be declared
 * and initializaed here.
 *
 * Passport members should only be called from contexts where authentication is needed.
 * It is imported to app.js for the necessity of initializing with the app object
 */

const passport = require("passport");
const passport_local = require("passport-local");
const users = require("../controllers/user.js");

/**
 * Configure passport to use the default local strategy.
 *
 * Must pass name 'local' to passport.authenticate when user logs in
 */
passport.use(new passport_local.Strategy(
  (username, password, callback) => {
    users.login(username, (error, user) => {
      if (error) { return callback(error); }
      if (!user) { return callback(null, false); }
      if (user.password != password) { return callback(null, false); }
      return callback(null, user);
    });
}));

passport.serializeUser( (user, callback) => {
  callback(null, user.username);
});

passport.deserializeUser( (username, callback) => {
  users.login(username, (err, user) => {
    if (err) { return callback(error); }
    callback(null, user);
  });
});

module.exports = passport;