const connection = require("../connection");
const { fecthArticleById } = require("../models/articles-model");

exports.insertACommentByArticleId = (comment, article_id) => {
  const { ...controllerComment } = comment;
  controllerComment.author = controllerComment.username;
  delete controllerComment.username;
  controllerComment.article_id = article_id;
  return connection("comments")
    .insert(controllerComment)
    .returning("*")
    .then(([controllerComment]) => {
      if (!controllerComment) {
        return Promise.reject({
          status: 404,
          msg: `No article found for id: ${article_id}`
        });
      }
      return controllerComment;
    });
};

exports.fetchCommentByArticleId = (article_id, sorted_by, ordered_by) => {
  return (
    connection("comments")
      .select("*")
      // .modify(queryBuilder => {
      //   if (article_id) queryBuilder.where({ article_id });
      // })
      .where({ article_id })
      .orderBy(sorted_by || "created_at", ordered_by || "desc")
      .then(comments => {
        if (!comments.length && article_id) {
          return Promise.all([comments, checkIfArticleExists(article_id)]);
        }

        return [comments];
      })
      .then(([comments]) => {
        return comments;
      })
  );
};

const checkIfArticleExists = article_id => {
  return connection("articles")
    .select("*")
    .where({ article_id })
    .then(articles => {
      console.log({ articles });
      if (!articles.length)
        return Promise.reject({
          status: 404,
          msg: `No articles found for id: ${article_id}`
        });
      return true;
    });
};
