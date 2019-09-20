const { fetchAllTopics } = require("../models/topics-model");

exports.getAllTopics = (req, res, next) => {
  console.log("HELLLOOO");
  fetchAllTopics()
    .then(topics => {
      res.status(200).json({ topics: topics });
    })
    .catch(next);
};
