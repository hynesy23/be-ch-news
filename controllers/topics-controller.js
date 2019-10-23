const { fetchAllTopics, insertATopic } = require("../models/topics-model");

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then(topics => {
      res.status(200).json({ topics: topics });
    })
    .catch(next);
};

exports.createATopic = (req, res, next) => {
  const topic = req.body;
  insertATopic(topic)
    .then(topic => {
      res.status(200).json({ topic, msg: "Topic created" });
    })
    .catch(next);
};
