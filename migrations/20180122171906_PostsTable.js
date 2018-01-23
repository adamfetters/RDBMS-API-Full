exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', tbl => {
      tbl.increments('id');
      tbl.string('name', 128).notNullable();
      tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('posts', tbl => {
      tbl.increments('id');
      tbl.integer('userId').references('id').inTable('users');
      tbl.text('text').notNullable();
      tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('tags', tbl => {
      tbl.increments('id');
      tbl.string('tag', 16).unique('tag', 'uq_tag_name');
      tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('posttags', tbl => {
      tbl.increments();
      tbl
        .integer('postId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('posts');
      tbl
        .integer('tagId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tags');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('posts'),
    knex.schema.dropTableIfExists('tags')
  ]);
};
