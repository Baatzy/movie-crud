var express = require('express')
var router = express.Router()
var db = require('../db')

/* GET home page. */
router.get('/', (req, res, next) => {
  db('movies').then(movies => {
    res.render('movies/index', { movies })
  })
})

router.get('/new', (req, res, next) => {
  res.render('movies/new')
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  db('movies').select('*').where({ id: id }).first()
  .then(movie => {
    res.render('movies/details', { movie: movie })
  })
})

router.post('/', (req, res, next) => {
  let addedMovie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    my_rating: req.body['my-rating'],
    poster_url: req.body['poster-url']
  }
  db('movies').insert(addedMovie, '*')
  .then(newMovie => {
    let id = newMovie[0].id

    res.redirect(`/movies/${id}`)
  })
})




module.exports = router
