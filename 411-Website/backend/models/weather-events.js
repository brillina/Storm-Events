const db = require('../db'); // Ensure this is the promise-based pool

const weatherEventController = {
  createWeatherEvent: async (req, res) => {
    const { User_id, category_id, eventBeginTime, eventEndTime, damageProperty, deathsDirect, deathsIndirect, injuriesDirect, injuriesIndirect, damageCrops } = req.body;
    const query = 'INSERT INTO WeatherEvent (User_id, category_id, eventBeginTime, eventEndTime, damageProperty, deathsDirect, deathsIndirect, injuriesDirect, injuriesIndirect, damageCrops) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    try {
      const [results] = await db.query(query, [User_id, category_id, eventBeginTime, eventEndTime, damageProperty, deathsDirect, deathsIndirect, injuriesDirect, injuriesIndirect, damageCrops]);
      res.status(201).json({ message: 'Weather event created', eventId: results.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllWeatherEvents: async (req, res) => {
    const query = 'SELECT * FROM WeatherEvent';

    try {
      const [results] = await db.query(query);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getWeatherEventById: async (req, res) => {
    const query = 'SELECT * FROM WeatherEvent WHERE event_id = ?';

    try {
      const [results] = await db.query(query, [req.params.id]);
      res.json(results[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateWeatherEventById: async (req, res) => {
    const { User_id, category_id, eventBeginTime, eventEndTime, damageProperty, deathsDirect, deathsIndirect, injuriesDirect, injuriesIndirect, damageCrops } = req.body;
    const query = 'UPDATE WeatherEvent SET User_id = ?, category_id = ?, eventBeginTime = ?, eventEndTime = ?, damageProperty = ?, deathsDirect = ?, deathsIndirect = ?, injuriesDirect = ?, injuriesIndirect = ?, damageCrops = ? WHERE event_id = ?';

    try {
      await db.query(query, [User_id, category_id, eventBeginTime, eventEndTime, damageProperty, deathsDirect, deathsIndirect, injuriesDirect, injuriesIndirect, damageCrops, req.params.id]);
      res.json({ message: 'Weather event updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteWeatherEventById: async (req, res) => {
    const query = 'DELETE FROM WeatherEvent WHERE event_id = ?';

    try {
      await db.query(query, [req.params.id]);
      res.json({ message: 'Weather event deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getWeatherStats: async (categoryName, attribute, orderDirection) => {
    try {
      const [results] = await db.query('CALL weather_status()', [categoryName, attribute, orderDirection]);
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = weatherEventController;
