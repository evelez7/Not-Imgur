/**
 * user.js
 *
 * The controller that queries, writes, and reads information from the database instance
 */
const db = require('../models/database.js');

module.exports = {
  /**
   * user.register
   *
   * Attempt to create a new user
   * If the user is found to already exist, return an error and prompt the user
   *
   * If successful, Passport will create a new session
   */
  register : function (username, email, password, callback)
  {
    // user table is of the form USER PW EMAIL
    db.query('INSERT INTO users SET ?', {username : username, password: password, email: email}, (err, result) => {
      if (err)
      {
        console.log("ERROR: User registration");
        return
      }
    });
    next();
  },

  /**
   * user.login
   *
   * Attempt to find specified user
   * If the user is found, will return to Passport and create a session
   * If not found, error will return and prompt the user accordingly
   *
   * If successful, Passport will verify and begin a session
   * @param callback a callback function given back to Passport
   */
  login: function(username, callback)
  {
    db.query('SELECT * from users WHERE username = ?', username, (err, result) => {
      if (err) { return callback(null, null) };
      return callback(null, result[0]);
    });
  },

  fetch: function(username, done)
  {
    db.query('SELECT * from users WHERE username = ?', username, (err, result) =>
    {
      if (err) {return done(err, null); }
      if (result.length === 0) { return done(null, null); }
      if (result[0].username != username) { return done(null, null); }
      return done(null, result[0]);
    });
  }
  // login: function(req, res, next)
  // {
  //   db.query('SELECT * from users WHERE username = ?', req.body.username, (err, result) => {
  //     if (err) { return callback(null, null) };

  //     console.log(result[0].username);
  //   });
  // }
}