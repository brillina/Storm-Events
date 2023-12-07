const db = require('../db'); // Ensure this is the promise-based pool

const additionalController = {
  searchWeatherEvents: async (req, res) => {
    const { query, category, startDate, endDate } = req.query;

    let sql = `SELECT * FROM WeatherEvent 
               JOIN Category ON WeatherEvent.category_id = Category.category_id`;

    let conditions = [];
    let params = [];

    if (query) {
      conditions.push(`WeatherEvent.event_name LIKE ?`);
      params.push(`%${query}%`);
    }

    if (category) {
      conditions.push(`Category.category_name = ?`);
      params.push(category);
    }

    if (startDate) {
      conditions.push(`WeatherEvent.eventBeginTime >= ?`);
      params.push(startDate);
    }

    if (endDate) {
      conditions.push(`WeatherEvent.eventEndTime <= ?`);
      params.push(endDate);
    }

    if (conditions.length) {
      sql += ` WHERE ` + conditions.join(' AND ');
    }

    try {
      const [results] = await db.query(sql, params);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = additionalController;
