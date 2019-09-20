const apiRouter = require("express").Router();
const topicsRouter = require("../routes/topics-router");
const usersRouter = require("../routes/users-router");
const articlesRouter = require("../routes/articles-router");
const commentsRouter = require("../routes/comments-router");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
