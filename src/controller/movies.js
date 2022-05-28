const { Movie, validateMovie } = require('../model/movie');

module.exports = {
    async getAllMovies(req, res) {
        try {
            const movies = await Movie.find({ user: req.user.id });
            res.status(200).json(movies)

        } catch (error) {
            console.log(error);
        }
    },

    // async getMovieById(req, res) {
    //     try {
    //         const movieID = await Movie.findById(req.params.id);
    //         res.send(movieID);

    //         if (!movieID) return res.status(404).send('No records match your request');

    //     } catch (error) {
    //         console.log(error);
    //     }
    // },

    async postMovie(req, res) {
        try {
            const { error } = validateMovie(req.body)
            if (error) return res.status(400).send(error);
            let movie = new Movie({
                user: req.user.id,
                title: req.body.title,
                genre: req.body.genre,
                rating: req.body.rating,
            });
    
            movie = await movie.save();
            res.send(movie);

        } catch (error) {
            console.log(error);
        }
    },

    async putMovie(req, res) {
        try {
            const { error } = validateMovie(req.body)
            if (error) return res.status(400).send(error);

            let movie = await Movie.findByIdAndUpdate(req.params.id, 
                {
                    title: req.body.title,
                    genre: req.body.genre,
                    rating: req.body.rating,
                },
                { new: true });
            movie = await movie.save();
            res.send(movie);

        } catch (error) {
            console.log(error);
        }
    },

    async deleteMovie(req, res) {
        try {
            const movie = await Movie.findByIdAndRemove(req.params.id)
            if (!movie) {
                return res.status(404)
                    .send("The movie with the given ID was not found!")
            }
            res.status(200).send(`Deleted: ${movie}`)
        } catch (err) {
            console.log(err)
        }
    },
}