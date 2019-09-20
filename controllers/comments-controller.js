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
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comments_id } = req.params;
  removeCommentById(comments_id)
    .then(response => {
      res.sendStatus(204);
    })
    .catch(next);
};
