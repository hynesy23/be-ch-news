const connection = require("../connection");

exports.fetchAllTopics = () => {
  return connection.select("*").from("topics");
};

exports.insertATopic = topic => {
  return connection("topics")
    .insert(topic)
    .returning("*");
};
