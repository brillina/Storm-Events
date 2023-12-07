const db = require('../db'); // Ensure this is the promise-based pool

const weatherQueryController = {
  countHighDeathTollTornadoes: async (req, res) => {
    const sql = `SELECT COUNT(*) FROM Tornado 
                 JOIN WeatherEvent ON Tornado.event_id = WeatherEvent.event_id 
                 WHERE WeatherEvent.deathsDirect > 20 
                 GROUP BY WeatherEvent.category_id`;

    try {
      const [results] = await db.query(sql);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  hailstoneSizesForDeathToll: async (req, res) => {
    const sql = `SELECT hailstone_size FROM Hail
                 JOIN WeatherEvent ON Hail.event_id = WeatherEvent.event_id
                 WHERE (WeatherEvent.deathsDirect < 50 AND Hail.hailstone_size IS NOT NULL)
                   OR (WeatherEvent.deathsDirect > 70 AND Hail.hailstone_size IS NOT NULL)`;

    try {
      const [results] = await db.query(sql);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = weatherQueryController;
