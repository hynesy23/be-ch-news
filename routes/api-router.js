const apiRouter = require("express").Router();
const topicsRouter = require("../routes/topics-router");
const usersRouter = require("../routes/users-router");
const articlesRouter = require("../routes/articles-router");
const commentsRouter = require("../routes/comments-router");
const { send405Error } = require("../errors/error-handling");
const { getAllEndPoints } = require("../controllers/api-controller");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

apiRouter
  .route("/")
  .get(getAllEndPoints)
  .all(send405Error);

module.exports = apiRouter;
