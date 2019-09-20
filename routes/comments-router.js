const commentsRouter = require("express").Router();
const {
  patchAComment,
  deleteCommentById
} = require("../controllers/comments-controller");
const { send405Error } = require("../errors/error-handling");

commentsRouter
  .route("/:comments_id")
  .patch(patchAComment)
  .delete(deleteCommentById)
  .all(send405Error);

module.exports = commentsRouter;
