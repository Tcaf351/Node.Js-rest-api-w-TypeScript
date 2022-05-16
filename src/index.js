// packages
const express = require('express')
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const app = express(); // initialize express

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());


// catch any errors when connecting to MongoDB
main().catch(err => console.log(err))
async function main() {
    // connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/Assignment2-Database');
    console.log('connected to MongoDB');
}


// routes
const routes = require('./routes/routes'); // bring in routes (src/routes/routes.js)
app.use('/api', routes.routerGet); // get method
app.use('/api', routes.routerPost); // post method


// listen to the port
const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));