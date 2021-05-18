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
const crypto = require('crypto');
const { body, checkValidation, validationResult } = require("express-validator");

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
    passReqToCallback: true,
    usernameField: 'email'
  },
  // the email is the username
  (req, username, password, done) => {
    // use express-validator to validate all calls for LOGIN, must handle differently for registration
    const validation_errors = validationResult(req);
    if (!validation_errors.isEmpty())
    {
      console.log("Bad validation!");
      return done(null, false, {message: "Bad info"});
    }

    // get user info from db and define a callback for .authentication calls
    users.fetch_email(username, (err, user) => {
      if (err) { return done(err, {message: "error!"}) }; // fail if error exists
      if (!user) { console.log("bad username!"); return done(null, false, {message: "incorrect username"}); } // fail if user was unable to be found

      let salt = "this is a bad salt";
      user.salt = "this is a bad salt";
      let hashed_password = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString('hex');
      if (user.password != hashed_password)
      {
        console.log("bad password!");
        return  done(null, false, {message: "Incorrect Password"}); // fail if passwords dont match
      }

      return done(null, user);
    });
}));

passport.serializeUser( (user, done) => {
  done(null, user.email);
});

passport.deserializeUser( (username, done) => {
  users.fetch_email(username, (err, user) => {
    done(null, user);
  });
});

module.exports = passport;