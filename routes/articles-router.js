const articlesRouter = require("express").Router();
const {
  getArticleById,
  getAllArticles,
  postAnArticle,
  patchAnArticleById,
  postACommentByArticleId,
  getCommentByArticleId
} = require("../controllers/articles-controller");
const { send405Error } = require("../errors/error-handling");

articlesRouter
  .route("")
  .get(getAllArticles)
  .post(postAnArticle)
  .all(send405Error);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchAnArticleById)
  .all(send405Error);

articlesRouter
  .route("/:article_id/comments")
  .post(postACommentByArticleId)
  .get(getCommentByArticleId)
  .all(send405Error);

module.exports = articlesRouter;
