// inialise express router
const router = require('express').Router();
const moviesController = require('../controller/movies');

router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getMovieById);
router.post('/', moviesController.postMovie);

router.delete('/:id', moviesController.deleteMovie);

module.exports = router;