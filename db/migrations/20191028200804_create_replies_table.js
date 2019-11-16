
exports.up = knex {
  return knex.schema.createTable('replies', repliesTable => {
    repliesTable.increments('reply_id').primary();
    repliesTable.string('sender').references('users.username').notNullable();
    repliesTable.string('receiver').reference('users.username').notNullable();
    repliesTable.integer('comment_id').references('comments.comment_id')
    repliesTable.timestamp('created_at').notNullable().default(knex.fn.now());
    repliesTable.text('body').notNullable();
  })
};

exports.down = function(knex) {
  
};
