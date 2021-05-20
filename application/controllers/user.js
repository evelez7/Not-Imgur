/**
 * user.js
 *
 * Queries, writes, and reads information for posts in database
 */
const { v4: uuidv4 } = require('uuid');
const db = require('../models/database.js');
const crypto = require('crypto');

module.exports = {
  /**
   * user.register
   *
   * Attempt to create a new user
   * If the user is found to already exist, return an error and prompt the user
   *
   * If successful, Passport will create a new session
   */
  register : function (req, res, next)
  {
    let new_id = uuidv4();
    // format Date object into MySQL DATE_TIME
    let date_created = new Date(new Date().toISOString()).toJSON().slice(0,19).replace('T', ' ');

    let new_salt = crypto.randomBytes(16).toString('hex');
    hash = crypto.pbkdf2Sync(req.body.password, new_salt, 1000, 64, `sha512`).toString('hex');
    // user table is of the form id username email password date_created
    db.query('INSERT INTO user SET ?',
      {
        id: new_id,
        name : req.body.username,
        password: hash,
        email: req.body.email,
        date_created: date_created,
        salt: new_salt
      },
      (err, result) => {
        if (err)
        {
          console.log("ERROR: User registration");
          console.log(err);
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
  login: function(username, done)
  {
    db.query('SELECT * from user WHERE name = ?', username, (err, result) => {
      if (err) { return done(null, null) };
      return done(null, result[0]);
    });
  },

  /**
   * user.fetch_username
   *
   * Retrieve a record based on the username
   */
  fetch_username: function(username, done)
  {
    db.query('SELECT * from user WHERE name = ?', username, (err, result) =>
    {
      if (err) {return done(err, null); }
      if (result.length === 0) { return done(null, null); }
      if (result[0].username != username) { return done(null, null); }
      return done(null, result[0]);
    });
  },

  /**
   * user.fetch_email
   *
   * Retrieve a record based on the email
   */
  fetch_email: function(email, done)
  {
    db.query('SELECT * from user WHERE email = ?', email, (error, result) =>
    {
      if (error) { return done(error, null); }
      if (result.length === 0) { return done(null, null); }
      return done(null, result[0]);
    });
  },

  /**
   * user.fetch_id
   *
   * Retrieve a record based on the id
   */
  fetch_id: function(id, done)
  {
    db.query('SELECT * from user WHERE id = ?', id, (error, result) =>
    {
      if (error) { return done(error, null); }
      if (result.length === 0) { return done(null, null); }
      return done(null, result[0]);
    });
  }
}