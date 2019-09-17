const express = require("express");
const apiRouter = require("./routes/api-router.js");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.log(err, "Logging the error from app.js");
  res.status(500).send("Uh-oh, there's been an error");
});

module.exports = app;
