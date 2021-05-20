/**
 * posts.js
 *
 * Queries, writes, and reads information for posts in database
 */
const db = require('../models/database.js');
const { nanoid } = require('nanoid');

module.exports = {
  /**
   * post.post
   *
   * Create an id and submit post record to db
   *
   * TODO: Probably should rename this to submit
   */
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
   * post.retrieve_single
   *
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

  /**
   * post.retrieve
   *
   * Retrieve more than one post
   *
   * This is called from index route
   *
   * TODO: dynamic number of posts, specify quant
   */
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
  },

  /**
   * post.retrieve_search
   *
   * Retrieve a certain number of records where the title matches the search term
   *
   * TODO: dynamic quantity of records
   */
  retrieve_search: (req, res, next) =>
  {
    db.query(`SELECT * from post WHERE title LIKE '%` + req.body.search_term  +  `%'`, [20], (error, result) => {
      if (error) console.log(error);
      if (!result) console.log("no result");
      req.posts = result;
      console.log(result);
      next();
    });
  }
}