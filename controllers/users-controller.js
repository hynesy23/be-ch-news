const {
  fetchUserByUsername,
  fetchAllUsers,
  insertAUser
} = require("../models/users-model");

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(user => {
      res.status(200).json({ user: user });
    })
    .catch(next);
};

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then(users => res.status(200).json({ users }))
    .catch(next);
};

exports.addAUser = (req, res, next) => {
  const user = req.body;
  insertAUser(user)
    .then(([user]) => {
      res.status(201).json({ user });
    })
    .catch(next);
};
