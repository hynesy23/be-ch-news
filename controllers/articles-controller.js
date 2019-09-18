const {
  fecthArticleById,
  updateAnArticleById
} = require("../models/articles-model");
const { insertACommentByArticleId } = require("../models/comments-model");

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
