const { Movie, validateMovie } = require('../model/movie');

module.exports = {
    async getAllMovies(req, res) {
        const movies = await Movie.find();
        res.send(movies);
    },

    async getMovieById(req, res) {
        try {
            const movieID = await Movie.findById(req.params.id);
            res.send(movieID);

        } catch (error) {
            console.log(error);
        }
    },

    async postMovie(req, res) {
        try {
            const { error } = validateMovie(req.body)
            if (error) return res.status(400).send(error);
            let movie = new Movie({
                title: req.body.title
            });
    
            movie = await movie.save();
            res.send(movie);

        } catch (error) {
            console.log(error);
        }
    },


    async deleteMovie(req, res) {
        try {
            const movie = await Movie.findOneAndDelete(req.params.id) 
                res.send(movie);
    

        } catch (error) {
            console.log(error);
        }
    }
}