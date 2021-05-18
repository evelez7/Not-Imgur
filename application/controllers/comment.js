/**
 *
 */
const db = require("../models/database.js");
const { nanoid } = require("nanoid");

module.exports = {
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
      date_created: new Date(new Date().toISOString()).toJSON().slice(0,19).replace('T', ' ')
    }, (err, result) => {
      if (err) console.log(err);
    });
  },

  submit_yes: (req, res, next) =>
  {
    console.log("in submit, ", req.id);
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

  retrieve_single: (req, res, next) =>
  {
  },

  retrieve: (req, res, next) =>
  {
    let user_id;
    db.query("SELECT * from comment WHERE postID = ?", req.post.id, (err, result) =>
    {
      if (err) console.log(err);
      req.comments = result;
      next();
    });
  }
}