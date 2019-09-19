const connection = require("../connection");

exports.fetchAllArticles = (sorted_by, ordered_by) => {
  return connection("articles")
    .select("*")
    .orderBy(sorted_by || "created_at", ordered_by || "desc");
};

exports.fecthArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count("comments.comments_id AS comment_count")
    .groupBy("articles.article_id")
    .then(([article]) => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `No article found for id: ${article_id}`
        });
      }
      article.comment_count = +article.comment_count;
      return article;
    });
};

exports.updateAnArticleById = (article_id, update) => {
  const { inc_votes } = update;
  return connection("articles")
    .where({ article_id })
    .increment("votes", inc_votes)
    .returning("*")
    .then(([article]) => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `No article found for id: ${article_id}`
        });
      }
      return [article];
    });
};
