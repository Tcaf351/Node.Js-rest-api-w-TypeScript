// packages
const express = require('express')
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv/config');

const app = express(); // initialize express

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());


main().catch(err => console.log(err)) // catch any errors when connecting to MongoDB
async function main() {
    // connect to MongoDB
    await mongoose.connect(process.env.DATABASE_CONNECTION);
    console.log('connected to MongoDB');
}


// routes
app.use('/api/movies', require('./routes/movies')); // bring in routes (src/routes/routes.js)
app.use('/api/users', require('./routes/userRoutes'));



// config routes



// listen to the port
const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));