
exports.up = function(knex) {
  return knex.schema.createTable('scores', (table) => {
    table.increments()
    table.string('name').notNullable().defaultTo('')
    table.integer('score').notNullable().defaultTo(0)
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('scores')
};
