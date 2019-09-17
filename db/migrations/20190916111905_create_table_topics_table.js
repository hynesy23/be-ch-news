exports.up = function(knex) {
  console.log("creating Topics table...");
  return knex.schema.createTable("topics", topicsTable => {
    topicsTable.string("slug").primary();
    topicsTable.string("description").notNullable();
  });
};

exports.down = function(knex) {
  console.log("Removing Topics table...");
  return knex.schema.dropTable("topics");
};
