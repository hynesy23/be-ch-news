const connection = require("../connection");

exports.fetchUserByUsername = username => {
  return connection
    .select("*")
    .from("users")
    .where({ username: username })
    .then(([user]) => {
      if (!user) {
        return Promise.reject({
          status: 404,
          msg: `No user found for ${username}`
        });
      }
      return user;
    });
};

exports.fetchAllUsers = () => {
  return connection("users").select("*");
};

exports.insertAUser = user => {
  return connection("users")
    .insert(user)
    .returning("*");
};
