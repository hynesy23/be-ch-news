const {
  updateACommentById,
  removeCommentById
} = require("../models/comments-model");

exports.patchAComment = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comments_id } = req.params;
  updateACommentById(comments_id, inc_votes)
    .then(([comment]) => {
      res.status(200).json({ comment: comment });
    })
    .catch(err => next(err));
};

exports.deleteCommentById = (req, res, next) => {
  const { comments_id } = req.params;
  console.log(comments_id, "comments id from controller");
  removeCommentById(comments_id)
    .then(response => {
      res.sendStatus(204);
    }) // Body is still coming back with comment... CHECK!!
    .catch(next);
};
