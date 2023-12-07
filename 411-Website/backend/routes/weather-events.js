const express = require('express');
const router = express.Router();
const db = require('../db'); // Ensure this is the promise-based pool
const weatherEventModel = require('../models/weather-events.js');

// ...

//works
// Retrieve a single weather event by ID
router.get('/weatherStats', async (req, res) => {
  const { category_name, attribute, order_direction } = req.query;
  
  try {
    const results = await weatherEventModel.getWeatherStats(category_name, attribute, order_direction);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const query = 'SELECT * FROM WeatherEvent WHERE event_id = ?';
    const [results] = await db.query(query, [req.params.id]);
    if (results.length === 0) {
      res.status(404).json({ error: 'Weather event not found' });
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// // Update a weather event by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const {
//       User_id,
//       category_id,
//       eventBeginTime,
//       eventEndTime,
//       damageProperty,
//       deathsDirect,
//       deathsIndirect,
//       injuriesDirect,
//       injuriesIndirect,
//       damageCrops,
//     } = req.body;
//     const query =
//       'UPDATE WeatherEvent SET User_id = ?, category_id = ?, eventBeginTime = ?, eventEndTime = ?, damageProperty = ?, deathsDirect = ?, deathsIndirect = ?, injuriesDirect = ?, injuriesIndirect = ?, damageCrops = ? WHERE event_id = ?';
//     const params = [
//       User_id,
//       category_id,
//       eventBeginTime,
//       eventEndTime,
//       damageProperty,
//       deathsDirect,
//       deathsIndirect,
//       injuriesDirect,
//       injuriesIndirect,
//       damageCrops,
//       req.params.id,
//     ];
//     const [results] = await db.query(query, params);
//     if (results.affectedRows === 0) {
//       res.status(404).json({ error: 'Weather event not found' });
//     } else {
//       res.json({ message: 'Weather event updated' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Delete a weather event by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const query = 'DELETE FROM WeatherEvent WHERE event_id = ?';
//     const [results] = await db.query(query, [req.params.id]);
//     if (results.affectedRows === 0) {
//       res.status(404).json({ error: 'Weather event not found' });
//     } else {
//       res.json({ message: 'Weather event deleted' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
