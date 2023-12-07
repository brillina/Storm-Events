const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection or pool

const weatherEventController = require('../models/weatherEventController.js');

//works
// Route to get weather events by month
router.get('/:month', async (req, res) => {
    try {
      // Assuming month is provided in 'MM' format (e.g., '03' for March)
      const month = req.params.month;
      const query = 'SELECT * FROM WeatherEvent WHERE MONTH(eventBeginTime) = ?';
      const [results] = await db.query(query, [month]);
  
      if (results.length === 0) {
        res.status(404).json({ error: 'No weather events found for this month' });
      } else {
        res.json(results);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
module.exports = router;
