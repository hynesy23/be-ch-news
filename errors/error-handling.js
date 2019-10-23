exports.send405Error = (req, res, next) => {
  res.status(405).send({
    msg:
      "Unfortunately, dear fellow, you can't use this method on this endpoint"
  });
};

exports.handleCustomErrors = (err, req, res, next) => {
  console.log(err, "err log custom");
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  console.log(err, "err log psql");

  const psqlRef = {
    "22P02": { status: 400, msg: "Invalid type of input" },
    "23503": {
      status: 404,
      msg: err.detail
    },
    "42703": {
      status: 400,
      msg: "You have tried to use a column that doesn't exists"
    },
    "23502": {
      status: 400,
      msg: "You have missed a key(s) name in your POST body"
    },
    "23505": {
      status: 400,
      msg: err.detail
    }
  };
  const msg = psqlRef[err.code].msg;
  const status = psqlRef[err.code].status;
  const psqlErrors = ["22P02", "23503", "42703", "23502", "23505"];
  if (psqlErrors.includes(err.code)) {
    res.status(status).json({ msg: msg });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error!!" });
};
