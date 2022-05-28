const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const { User, validateUser } = require('../model/userModel');
const { validateAuth } = require('../auth/auth');

const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body; // pulls these values from the form

    console.log(req.body);
    let error = validateUser(req.body) // Validation for user to enter all fields as defined by schema with Joi validation.
    if (error.error) return res.status(400).send(error.error.details[0].message)

    // if (!userName || !email || !password) { // Validation for user to enter all fields
    //     res.status(400)
    //     throw new Error('Please add all fields')
    // }

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
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id)
        }) 
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.json({ message: 'Register User' })
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body; // we get this from the form as the user logs in

    const { error } = validateAuth(req.body); // validates what they entered through the Joi schema in auth/auth.js
    if (error) return res.status(400).send(error.details[0].message);

    // check for existing user email
    const user = await User.findOne({ email })

    // check if the hashed password is the same as the password passed in the form by the user
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials');
    }
})


const getMe = asyncHandler(async (req, res) => {
    const { _id, userName, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        userName,
        email
    })
})


// Generate JWT token
const generateToken = (id) => { // the id is the user id that we set as the payload.
    return jwt.sign({ id }, process.env.JWT_SECRET, { // JWT is signing the payload (the data) that we pass in. id gets destructured from payload
        expiresIn: '30d' // token expires in 30 days
    }) 
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}