const express = require("express");
const apiRouter = require("./routes/api-router.js");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res, next) =>
  res.status(404).json({ msg: "This is not a valid route. Please try again" })
);

app.use((err, req, res, next) => {
  console.log(err, "ERR FROM APP.JS");
  if (err.status === 404) res.status(err.status).send({ msg: err.msg });
  else next(err);
});

app.use((err, req, res, next) => {
  const psqlRef = {
    "22P02": { status: 400, msg: "Invalid type of input" },
    "23503": {
      status: 404,
      msg: 'Key (article_id)=(9999) is not present in table "articles".'
    }
  };
  const msg = psqlRef[err.code].msg;
  const psqlErrors = ["22P02"];
  if (psqlErrors.includes(err.code)) {
    res.status(400).json(msg);
  }
});

module.exports = app;
