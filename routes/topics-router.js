const topicsRouter = require("express").Router();
const {
  getAllTopics,
  createATopic
} = require("../controllers/topics-controller");
const { send405Error } = require("../errors/error-handling");

topicsRouter
  .route("/")
  .get(getAllTopics)
  .post(createATopic)
  .all(send405Error);

module.exports = topicsRouter;
