const mongoose = require('mongoose');
const Joi = require('joi');

// Schema
const movieSchema = new mongoose.Schema({
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
    },
    image: {
        type: String,
        required: true,
    }
});

const Movie = mongoose.model("Movie", movieSchema);

const validateMovie = (movie) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(40).required(),
        genre: Joi.string().min(3).max(10).required(),
        rating: Joi.number().required(),
        image: Joi.string().required()
    })
    return schema.validate(movie)
}


module.exports.movieSchema = movieSchema; // line 5
module.exports.Movie = Movie; // line 15
module.exports.validateMovie = validateMovie; // line 17