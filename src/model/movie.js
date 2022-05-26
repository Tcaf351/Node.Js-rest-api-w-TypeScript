const mongoose = require('mongoose');
const Joi = require('joi');

// Schema
const movieSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40
    },
    genre: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10
    },
    rating: {
        type: Number,
        required: true,
    }
});

const Movie = mongoose.model("Movie", movieSchema);

const validateMovie = (movie) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(40).required(),
        genre: Joi.string().min(3).max(10).required(),
        rating: Joi.number().required(),
    })
    return schema.validate(movie)
}


module.exports.movieSchema = movieSchema; // line 5
module.exports.Movie = Movie; // line 15
module.exports.validateMovie = validateMovie; // line 17