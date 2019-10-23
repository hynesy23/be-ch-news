const connection = require("../connection");
// const { fecthArticleById } = require("../models/articles-model");

exports.insertACommentByArticleId = (comment, article_id) => {
  console.log("CAN YOU SEEEE MEEEE !?!?!?!");
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

exports.fetchCommentByArticleId = (article_id, sort_by, order) => {
  console.log("CAN YOU SEEEE MEEEE !?!?!?!");

  return connection("comments")
    .select("*")
    .where({ article_id })
    .orderBy(sort_by || "created_at", order || "desc")
    .then(comments => {
      if (!comments.length && article_id) {
        return Promise.all([comments, checkIfArticleExists(article_id)]);
      }

      return [comments];
    })
    .then(([comments]) => {
      return comments;
    });
};

const checkIfArticleExists = article_id => {
  console.log("CAN YOU SEEEE MEEEE !?!?!?!");

  return connection("articles")
    .select("*")
    .where({ article_id })
    .then(articles => {
      if (!articles.length)
        return Promise.reject({
          status: 404,
          msg: `No articles found for id: ${article_id}`
        });
      return true;
    });
};

exports.updateACommentById = (comment_id, inc_votes) => {
  console.log("CAN YOU SEEEE MEEEE !?!?!?!");

  return connection("comments")
    .where({ comment_id })
    .increment("votes", inc_votes || 0)
    .returning("*")
    .then(([comment]) => {
      if (!comment)
        return Promise.reject({
          status: 404,
          msg: "I'm sorry, comment does not exist"
        });
      return comment;
    });
};

exports.removeCommentById = comment_id => {
  console.log("CAN YOU SEEEE MEEEE !?!?!?!");

  return connection("comments")
    .where({ comment_id })
    .del()
    .then(delete_count => {
      if (!delete_count) {
        return Promise.reject({
          status: 404,
          msg: "No such comment. There was nothing to delete..."
        });
      }
    });
};
