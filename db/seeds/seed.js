const {
  topicsData,
  articlesData,
  commentsData,
  usersData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertions = knex("topics")
        .insert(topicsData)
        .returning("*");
      const usersInsertions = knex("users")
        .insert(usersData)
        .returning("*");
      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(([topicsInsertions, usersInsertions]) => {
      const formattedArticles = formatDates(articlesData, "created_at");

      return knex
        .insert(formattedArticles)
        .into("articles")
        .returning("*");
    })
    .then(articleRows => {
      const articleRef = makeRefObj(articleRows, "title", "article_id");
      const formattedComments = formatComments(commentsData, articleRef);
      return knex("comments")
        .insert(formattedComments)
        .returning("*");
    });
};
