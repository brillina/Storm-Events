const mysql = require('mysql2');

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
  
  // Use the database connection check middleware
  
  
module.exports = pool.promise();
