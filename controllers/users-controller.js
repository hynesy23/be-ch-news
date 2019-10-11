const { fetchUserByUsername, fetchAllUsers } = require("../models/users-model");

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(user => {
      res.status(200).json({ user: user });
    })
    .catch(next);
};

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers().then(users => res.status(200).json({ users: users }));
};
