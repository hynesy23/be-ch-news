const usersRouter = require("express").Router();
const {
  getUserByUsername,
  getAllUsers,
  addAUser
} = require("../controllers/users-controller");
const { send405Error } = require("../errors/error-handling");

usersRouter
  .route("")
  .get(getAllUsers)
  .post(addAUser)
  .all(send405Error);

usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .all(send405Error);

module.exports = usersRouter;
