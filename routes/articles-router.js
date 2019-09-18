const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchAnArticleById,
  postACommentByArticleId
} = require("../controllers/articles-controller");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchAnArticleById);

articlesRouter.route("/:article_id/comments").post(postACommentByArticleId);

module.exports = articlesRouter;
