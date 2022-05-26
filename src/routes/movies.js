// inialise express router
const router = require('express').Router();
const moviesController = require('../controller/movies');

// router.get('/', moviesController.getAllMovies);
// router.get('/:id', moviesController.getMovieById);
// router.post('/', moviesController.postMovie);
// router.put('/:id', moviesController.putMovie);
// router.delete('/:id', moviesController.deleteMovie);

router.route('/').get(moviesController.getAllMovies).post(moviesController.postMovie);
router.route('/:id').get(moviesController.getMovieById).put(moviesController.putMovie).delete(moviesController.deleteMovie);

module.exports = router;