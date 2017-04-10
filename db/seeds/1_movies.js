exports.seed = (knex) => {
  return knex('movies').del()
    .then(() => {
      return knex('movies').insert([
        {
          id: 1,
          title: 'Speed 2: Cruise Control',
          director: 'Jan de Bont',
          year: 1997,
          my_rating: 3,
          poster_url: 'http://www.gstatic.com/tv/thumb/movieposters/19492/p19492_p_v8_ae.jpg'
        },
        {
          id: 2,
          title: 'Highlander II: The Quickening',
          director: 'Russell Mulcahy',
          year: 1991,
          my_rating: 1,
          poster_url: 'https://upload.wikimedia.org/wikipedia/en/5/5c/Highlander_II.jpg'
        },
        {
          id: 3,
          title: 'Spice World',
          director: 'Bob Spiers',
          year: 1998,
          my_rating: 5,
          poster_url: 'http://www.gstatic.com/tv/thumb/movieposters/20358/p20358_p_v8_aa.jpg'
        }
      ])
    }).then(() => {
      return knex.raw(
        "SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies));"
      )
    })
}
