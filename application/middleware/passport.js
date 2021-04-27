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
let passport_local = require("passport-local");
const users = require("../controllers/user.js");

/**
 * Configure passport to use the default local strategy.
 *
 * A verify callback must be specified as an argument to the Strategy
 * Must pass name 'local' to passport.authenticate
 *
 * NOTE: authentication currently does not require, or take into consideration, email
 */
passport.use(new passport_local.Strategy(
  {
    passReqToCallback: true
  },
  (req, username, password, done) => {
  users.fetch(username, (err, user) => {
    if (err) { return done(err) };
    if (!user) { return done(null, false, {message: "incorrect username"}); }
    if (user.password != password) { return done(null, false, {message: "Incorrect Password"}); }
    return done(null, user);
  });
}));

passport.serializeUser( (user, done) => {
  done(null, user.username);
});

passport.deserializeUser( (username, done) => {
  users.fetch(username, (err, user) => {
    done(null, user);
  });
});

module.exports = passport;