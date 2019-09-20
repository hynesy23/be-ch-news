const commentsRouter = require("express").Router();
const {
  patchAComment,
  deleteCommentById
} = require("../controllers/comments-controller");

commentsRouter
  .route("/:comments_id")
  .patch(patchAComment)
  .delete(deleteCommentById);

module.exports = commentsRouter;
