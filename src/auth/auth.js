const Joi = require('joi');

const validateAuth = (auth) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(5).max(100).required()
    });
    return schema.validate(auth);
};

module.exports.validateAuth = validateAuth;