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
  const { sorted_by } = req.query;
  const { ordered_by } = req.query;
  const { author } = req.query;
  const { topic } = req.query;
  fetchAllArticles(sorted_by, ordered_by, author, topic)
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
    .catch(err => next(err));
};

exports.patchAnArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const update = req.body;
  updateAnArticleById(article_id, update)
    .then(article => {
      res.status(200).json({ article: article });
    })
    .catch(err => next(err));
};

exports.postACommentByArticleId = (req, res, next) => {
  const comment = req.body;
  const { article_id } = req.params;
  insertACommentByArticleId(comment, article_id)
    .then(comment => {
      res.status(201).json({ comment: comment });
    })
    .catch(err => next(err));
};

exports.getCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sorted_by } = req.query;
  const { ordered_by } = req.query;
  fetchCommentByArticleId(article_id, sorted_by, ordered_by)
    .then(comments => {
      res.status(200).json({ comments: comments });
    })
    .catch(err => next(err));
};
