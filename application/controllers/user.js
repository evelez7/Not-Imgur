const db = require('../models/database.js');

module.exports = {
  register : function (req, res, next)
  {
    console.log("BEFORE SELECT");
    db.query('INSERT INTO users SET ?', {username : req.body.username, password: req.body.password}, (err, result) => {
      if (err) console.log("ERROR: User registration")
      console.log("username: ", req.body.username);
      console.log("password: ", req.body.password);
    });
    next();
  },

  /**
   * Fetch specified user from req.user from database
   */
  fetch: function (req, res, next)
  {
    db.query('SELECT * FROM users WHERE username= ?', [req.body.username], (err, result) => {
      if (err) console.log("ERROR: User fetch")
    });
  },

  login: function(req, res, next)
  {
    db.query('SELECT * from users WHERE username = ?', req.body.username, (err, result) => {
    });
    next();
  }
}