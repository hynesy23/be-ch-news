const {
  updateACommentById,
  removeCommentById
} = require("../models/comments-model");

exports.patchAComment = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  updateACommentById(comment_id, inc_votes)
    .then(comment => {
      res.status(200).json({ comment: comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(response => {
      res.sendStatus(204);
    })
    .catch(next);
};
