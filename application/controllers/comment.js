/**
 * comment.js
 *
 * Queries, writes, and reads information for comments in database
 */
const db = require("../models/database.js");
const { nanoid } = require("nanoid");

module.exports = {
  /**
   * comment.submit
   *
   * Creates a new record in the comment table
   *
   * Requires to create a comment id
   * authorId and postId are foreign keys for user, post tables respectively
   */
  submit: (comment, postId, userId) =>
  {
    let new_id = nanoid();
    db.query("INSERT INTO comment SET ?",
    {
      id: new_id,
      comment: comment,
      postId: postId,
      authorId: userId,
      likes: 0,
      // mysql datetimes are complicated, thank you stack overflow
      date_created: new Date(new Date().toISOString()).toJSON().slice(0,19).replace('T', ' ')
    }, (err, result) => {
      if (err) console.log(err);
    });
  },

  submit_yes: (req, res, next) =>
  {
    let new_id = nanoid();
    db.query("INSERT INTO comment SET ?",
    {
      id: new_id,
      comment: req.body.comment,
      postId: req.body.postId,
      authorId: req.id,
      likes: 0,
      date_created: new Date(new Date().toISOString()).toJSON().slice(0,19).replace('T', ' ')
    }, (err, result) => {
      if (err) console.log(err);
      next();
    });
  },

  /**
   * comment.retrieve
   *
   * Fetches a single comment record from the database based on the id of a post
   *
   * The id is carried within the request parameter
   * This is only called from routes/image_post
   */
  retrieve: (req, res, next) =>
  {
    db.query("SELECT * from comment WHERE postID = ?", req.post.id, (err, result) =>
    {
      if (err) console.log(err);
      req.comments = result;
      next();
    });
  }
}