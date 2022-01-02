const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Create server express
const app = express();

// CORS config
app.use(cors());

// Read and parse body
app.use(express.json());

// Database
dbConnection();

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
   console.log(`Server listening in port ${3000}`);
});
