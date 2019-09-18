const { fetchAllTopics } = require("../models/topics-model");

exports.getAllTopics = (req, res, then) => {
  fetchAllTopics()
    .then(topics => {
      res.status(200).json({ topics: topics });
    })
    .catch(err => next(err));
};
