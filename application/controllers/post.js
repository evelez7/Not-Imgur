/**
 * posts.js
 *
 * Queries, writes, and reads information for posts in database
 */
const db = require('../models/database.js');
const { nanoid } = require('nanoid');

module.exports = {
  post : (req, target_path, done) =>
  {
    // post records are of the form id userID title description image date_created
    let new_id = nanoid();
    db.query('INSERT INTO post SET ?',
    {
      id: new_id,
      userID: req.user.id,
      title: req.body.title,
      description: req.body.description,
      image: target_path,
      date_created: new Date(new Date().toISOString()).toJSON().slice(0,19).replace('T', ' ')
    },
    (error, result) => {
      if (error) { console.log("error, ", error); }
      // if the post is submitted correctly, return id to use by submission router
      // the callback function takes (error, result)

      return done(error, new_id);
    });
  },

  /**
   * Retrieves a post record from db according to the id of the post requested
   */
  retrieve_single : (req, res, next) =>
  {
    db.query('SELECT * from post WHERE id = ? LIMIT ?', [req.params.postId, 1],
    (error, result) =>
    {
      if (error) console.log(error);

      if (!result) console.log("no result");
      req.post = result[0];
      next();
    });
  },

  retrieve: (req, res, next) =>
  {
    db.query('SELECT * from post LIMIT ?',  20,
    (error, result) =>
    {
      if (error) console.log(error);
      if (!result) console.log("no result");
      req.posts = result;
      next();
    });
  }
}