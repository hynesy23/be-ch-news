exports.up = knex => {
  console.log("creating Users table...");
  return knex.schema.createTable("users", usersTable => {
    usersTable.string("username").primary();
    usersTable.string("avatar_url").notNullable();
    usersTable.string("name").notNullable();
  });
};

exports.down = function(knex) {
  console.log("Removing Users table...");
  return knex.schema.dropTable("users");
};
