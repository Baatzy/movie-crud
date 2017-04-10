exports.up = (knex) => {
  return knex.schema.createTable('movies', table => {
    table.increments()
    table.string('title').notNullable()
    table.string('director').notNullable()
    table.integer('year').notNullable()
    table.integer('my_rating').notNullable()
    table.text('poster_url').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('movies')
}
