const apiRouter = require("express").Router();
const topicsRouter = require("../controllers/topics-controller");

apiRouter.Router("/topics").get(topicsRouter);

module.exports = apiRouter;
