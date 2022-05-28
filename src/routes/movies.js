// inialise express router
const router = require('express').Router();
const moviesController = require('../controller/movies');

// router.get('/', moviesController.getAllMovies);
// router.get('/:id', moviesController.getMovieById);
// router.post('/', moviesController.postMovie);
// router.put('/:id', moviesController.putMovie);
// router.delete('/:id', moviesController.deleteMovie);

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, moviesController.getAllMovies).post(protect, moviesController.postMovie);
router.route('/:id').put(protect, moviesController.putMovie).delete(protect, moviesController.deleteMovie);

module.exports = router;