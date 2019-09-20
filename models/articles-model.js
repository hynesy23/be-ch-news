const connection = require("../connection");

exports.fetchAllArticles = (sorted_by, ordered_by, author, topic) => {
  return connection("articles")
    .select("articles.*")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count("comments.comments_id AS comment_count")
    .groupBy("articles.article_id")
    .orderBy(sorted_by || "created_at", ordered_by || "desc")
    .modify(queryBuilder => {
      if (author) queryBuilder.where({ "articles.author": author });
      if (topic) queryBuilder.where({ topic });
    })
    .then(articles => {
      if (!articles.length && topic) {
        return Promise.all([articles, doesTopicExist(topic)]);
      }
      if (!articles.length && author) {
        return Promise.all([articles, doesAuthorExist(author)]);
      }

      return [articles];
    })
    .then(([articles]) => {
      console.log(articles, "LOG OF ARTICLE FROM MODEL");
      return articles;
    });
};

const doesTopicExist = topic => {
  return connection("articles")
    .select("*")
    .where({ topic })
    .then(topics => {
      if (!topics.length)
        return Promise.reject({
          status: 404,
          msg: "I'm sorry, no such topic exists"
        });
      return true;
    });
};

const doesAuthorExist = author => {
  return connection("articles")
    .select("*")
    .where({ author })
    .then(authors => {
      if (!authors.length)
        return Promise.reject({
          status: 404,
          msg: "I'm sorry, no such author exists"
        });
      return true;
    });
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
