const topicsRouter = require("express").Router();
const { getAllTopics } = require("../controllers/topics-controller");
const { send405Error } = require("../errors/error-handling");

topicsRouter
  .route("/")
  .get(getAllTopics)
  .all(send405Error);

module.exports = topicsRouter;
