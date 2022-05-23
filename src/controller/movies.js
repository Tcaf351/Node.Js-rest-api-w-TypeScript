const { Movie, validateMovie } = require('../model/movie');

module.exports = {
    async getAllMovies(req, res) {
        console.log('this is a test for testing');
    },

    async postMovie(req, res) {
        try {
            const { error } = validateMovie(req.body)
            if (error) return res.status(400).send(error);
            const movie = new Movie({
                title: req.body.title
            });
    
            movie = await movie.save();
            res.send(movie);

        } catch (error) {
            console.log(error);
        }
    }
}