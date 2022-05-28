const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1] // gives us just the token ['bearer', 'token']

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token, as the token has the user id from the payload
            // req.user = await User.User.findById
            req.user = await User.User.findById(decoded.id).select('-password') // decodes the user id without the password
            next();

        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
});

module.exports = { protect };