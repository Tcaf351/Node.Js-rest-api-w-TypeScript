// inialise express router
const router = require('express').Router();
const moviesController = require('../controller/movies');

router.get('/', moviesController.getAllMovies);
router.post('/', moviesController.postMovie);

module.exports = router;