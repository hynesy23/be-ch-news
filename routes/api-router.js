const apiRouter = require("express").Router();
const topicsRouter = require("../routes/topics-router");
const usersRouter = require("../routes/users-router");
const articlesRouter = require("../routes/articles-router");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;