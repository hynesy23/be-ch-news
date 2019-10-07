const endpoints = require("../endpoints.json");

exports.getAllEndPoints = (req, res, next) => {
  res.json({ endpoints: endpoints });
};
