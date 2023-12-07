const express = require('express');
const mysql = require('mysql2');

// Initialize express app
const app = express();
const cors = require('cors'); // Import the cors package


// Use environment variable for port or default to 3000
const port = process.env.PORT || 3000;

// Create a MySQL pool connection
const pool = mysql.createPool({
  host: '34.41.207.129',
  user: 'root',
  password: '', // Use environment variable for the password
  database: 'cs411',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to check database connection
function checkDatabaseConnection(req, res, next) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return res.status(500).send('Error connecting to the database');
    }
    
    console.log('Successfully connected to the database');
    connection.release();
    next();
  });
}
app.use(cors());

// Use the database connection check middleware
app.use(checkDatabaseConnection);

// In your server.js or app.js

app.use(express.json());


const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);


const weatherEventRoutes = require('./routes/weather-events');
app.use('/api/weather-events', weatherEventRoutes);

const categoryRoutes = require('./routes/category');
app.use('/api/category', categoryRoutes);


const statisticsRoutes = require('./routes/statistics');
const additionalRoutes = require('./routes/additional');

app.use('/api/statistics', statisticsRoutes);
app.use('/api/additional', additionalRoutes);


const weatherQueriesRoutes = require('./routes/weatherQueries');
app.use('/api/weather', weatherQueriesRoutes);

const weatherEventsByMonthRoutes = require('./routes/weathereventcontroller');
app.use('/api/weather-events-by-month', weatherEventsByMonthRoutes);




// Simple route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

