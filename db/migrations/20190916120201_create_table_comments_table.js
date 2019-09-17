exports.up = knex => {
  console.log("creating Comments table...");
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comments_id").primary();
    commentsTable.string("author").references("users.username");
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
    commentsTable.text("body").notNullable();
  });
};

exports.down = function(knex) {
  console.log("Removing Comments table...");
  return knex.schema.dropTable("comments");
};
