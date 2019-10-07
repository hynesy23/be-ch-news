const express = require("express");
const apiRouter = require("./routes/api-router.js");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors
} = require("./errors/error-handling");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res, next) =>
  res.status(404).json({ msg: "This is not a valid route. Please try again" })
);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
