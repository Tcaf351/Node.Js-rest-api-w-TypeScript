const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const app = express();


const PORT = process.env.PORT || 8000
app.listen(() => console.log(`Server running on port: ${PORT}`));