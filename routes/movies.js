var express = require('express')
var router = express.Router()
var db = require('../db')

// GET route for all movie reviews
router.get('/', (req, res, next) => {
  // Grab all movies via an async request, then...
  db('movies').then(movies => {
    // Pass the movies database object to Handlebars so it can render template
    res.render('movies/index', { movies })
  })
})

// GET route for new movie review form
router.get('/new', (req, res, next) => {
  // Render the form via Handlebars to add a new movie review
  res.render('movies/new')
})

// GET route for a movie by ID
router.get('/:id', (req, res, next) => {
  // Grabbing req ID
  let id = req.params.id
  // Grab all movies via an async request where the ID matches and take the first element of the result array, then...
  db('movies').select('*').where({ id: id }).first().then(movie => {
    // Pass the movie object to Handlebars so it can render template
    res.render('movies/details', { movie: movie })
  })
})

// GET route to eventually edit existing movie
router.get('/:id/edit', (req, res, next) => {
  // Grabbing req ID
  let id = req.params.id
  // Grab all movies via an async request where the ID matches and take the first element of the result array, then...
  db('movies').select('*').where({ id: id }).first().then(movie => {
    // Pass the movie object to Handlebars so it can render form with movie info
    res.render('movies/edit', { movie: movie })
  })
})

// POST route for new movie review
router.post('/', (req, res, next) => {
  // Taking the req.body from the form URL and assigning the form input field name data to keys in a new addedMovie object
  let addedMovie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    my_rating: req.body['my-rating'],
    poster_url: req.body['poster-url']
  }
  // Validation to make sure the year is after 1900
  let year = parseInt(req.body.year)
  if (Number.isNaN(year) || year <= 1900) {
    res.render('movies/new', { error: 'Year must be after 1900 dude!', addedMovie })
  } else {
  // Making an async request to insert addedMovie, then...
  db('movies').insert(addedMovie, '*').then(newMovie => {
    // Grabbing the newMovie ID
    let id = newMovie[0].id
    //Redirect the client to the new movie review when the new movie form is submitted
    res.redirect(`/movies/${id}`)
    })
  }
})

// PUT route to edit existing movie
router.put('/:id', (req, res, next) => {
  let id = req.params.id
  // Taking the req.body from the form URL and assigning the form input field name data to keys in a new addedMovie object
  let movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    my_rating: req.body['my-rating'],
    poster_url: req.body['poster-url']
  }
  // Making an async request to insert updatedMovie, then...
  db('movies').update(movie, '*').where({ id: id }).then(updatedMovie => {
    // Grabbing the updatedMovie ID
    let id = updatedMovie[0].id
    //Redirect the client to the new movie review when the new movie form is submitted
    res.redirect(`/movies/${id}`)
  })
})

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  db('movies').del().where({ id: id }).then(() => {
    res.redirect('/movies')
  })
})

module.exports = router
