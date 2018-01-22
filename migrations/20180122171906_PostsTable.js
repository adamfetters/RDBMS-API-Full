exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', tbl => {
      tbl.increments('id').primary();
      tbl.string('name', 128).unique('user_name', 'uq_users_name');
      tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('posts', tbl => {
      tbl.increments('id').primary();
      tbl.integer('userId').references('users.id');
      tbl.text('text').required();
      tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
