const articlesRouter = require("express").Router();
const {
  getArticleById,
  getAllArticles,
  patchAnArticleById,
  postACommentByArticleId,
  getCommentByArticleId
} = require("../controllers/articles-controller");

articlesRouter.route("").get(getAllArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchAnArticleById);

articlesRouter
  .route("/:article_id/comments")
  .post(postACommentByArticleId)
  .get(getCommentByArticleId);

module.exports = articlesRouter;
