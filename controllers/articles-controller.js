const {
  fecthArticleById,
  updateAnArticleById,
  fetchAllArticles
} = require("../models/articles-model");
const {
  insertACommentByArticleId,
  fetchCommentByArticleId
} = require("../models/comments-model");

exports.getAllArticles = (req, res, next) => {
  const { sort_by } = req.query;
  const { order } = req.query;
  const { author } = req.query;
  const { topic } = req.query;
  fetchAllArticles(sort_by, order, author, topic)
    .then(articles => {
      res.status(200).json({ articles: articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fecthArticleById(article_id)
    .then(article => {
      res.status(200).json({ article: article });
    })
    .catch(next);
};

exports.patchAnArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const update = req.body;
  updateAnArticleById(article_id, update)
    .then(article => {
      res.status(200).json({ article: article });
    })
    .catch(next);
};

exports.postACommentByArticleId = (req, res, next) => {
  const comment = req.body;
  const { article_id } = req.params;
  insertACommentByArticleId(comment, article_id)
    .then(comment => {
      res.status(201).json({ comment: comment });
    })
    .catch(next);
};

exports.getCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by } = req.query;
  const { order } = req.query;
  fetchCommentByArticleId(article_id, sort_by, order)
    .then(comments => {
      res.status(200).json({ comments: comments });
    })
    .catch(next);
};
