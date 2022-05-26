const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const { User, validateUser } = require('../model/userModel');

const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body; // pulls these values from the form

    let error = validateUser(req.body)
    if (error.error) return res.status(400).send(error.error.details[0].message)

    if (!userName || !email || !password) { // Validation for user to enter all fields
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if user exists
    const userExists = await User.findOne({ email }) // searching MongoDB for an existing email

    if (userExists) {
        res.status(400)
        throw new Error('User already exists');
    } // if no user exists, continue to hash password

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({ // creates new user
        userName,
        email,
        password: hashPassword //  hashes new users password
    })

    if (user) { // if creating new user was successful send a 201 with their entered data minus password
        res.status(201).json({
            _id: user.id,
            userName: user.name,
            email: user.email
        }) 
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.json({ message: 'Register User' })
})

const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Login User' })
})

const getMe = asyncHandler(async (req, res) => {
    res.json({ message: 'User data display' })
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}