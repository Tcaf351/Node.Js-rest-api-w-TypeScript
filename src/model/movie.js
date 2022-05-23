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
    
});

const Movie = mongoose.model('Movie', movieSchema);

const validateMovie = (movie) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(40).required()
    })
    return schema.validate(movie)
}


module.exports.movieSchema = movieSchema; // line 5
module.exports.MovieSchema = Movie; // line 15
module.exports.validateMovie = validateMovie; // line 17