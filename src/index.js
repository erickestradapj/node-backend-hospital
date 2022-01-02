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

// Public directory
app.use(express.static('src/public'));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/todo', require('./routes/searches'));
app.use('/api/uploads', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
   console.log(`Server listening in port ${3000}`);
});
