const { Movie, validateMovie } = require('../model/movie');
const { User } = require('../model/userModel');

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
            const user = await User.findById(req.user.id); // logged in users id

            // Check for user
            if (!user) {
                res.status(401)
                throw new Error('User not found');
            }


            const { error } = validateMovie(req.body)
            if (error) return res.status(400).send(error);

            let movie = await Movie.findByIdAndUpdate(req.params.id, 
                {
                    title: req.body.title,
                    genre: req.body.genre,
                    rating: req.body.rating,
                },
                { new: true });

            // Make sure the logged in user matches the movie user
            if (movie.user.toString() !== user.id) {
                res.status(401);
                throw new Error('User not authorized');
            }

            movie = await movie.save();
            res.send(movie);

        } catch (error) {
            console.log(error);
        }
    },

    async deleteMovie(req, res) {
        try {
            const movie = await Movie.findById(req.params.id)

            if (!movie) {
                return res.status(404)
                    .send("The movie with the given ID was not found!")
            }


            const user = await User.findById(req.user.id); // logged in users id

            // Check for user
            if (!user) {
                res.status(401)
                throw new Error('User not found');
            }

            // Make sure the logged in user matches the movie user
            if (movie.user.toString() !== user.id) {
                res.status(401);
                throw new Error('User not authorized');
            }

            await movie.remove()

            


            // console.log(user);





            res.status(200).send(`Deleted: ${movie}`)
    
        } catch (err) {
            console.log(err)
        }
    },
}