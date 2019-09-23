const {
  updateACommentById,
  removeCommentById
} = require("../models/comments-model");

exports.patchAComment = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  console.log(comment_id);
  updateACommentById(comment_id, inc_votes)
    .then(comment => {
      console.log(comment, "contoller log");
      //if (comment === undefined) return [];
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
