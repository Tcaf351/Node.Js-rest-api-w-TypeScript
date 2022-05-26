const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    userName: {
        required: true,
        unique: true,
        type: String,
        minlength: 3,
        maxlength: 40
    },
    email: {
        required: true,
        unique: true,
        type: String,
        minlength: 5,
        maxlength: 50
    },
    password: {
        required: true,
        type: String,
        minlength: 3,
        maxlength: 60
    },
});

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        userName: Joi.string().min(3).max(40).required(),
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(3).max(60).required(),
    });
    return schema.validate(user);
};

module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.validateUser = validateUser;