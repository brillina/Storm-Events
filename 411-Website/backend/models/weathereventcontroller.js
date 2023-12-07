const db = require('../db');

const weatherEventModel = {
  getWeatherEventsByMonth: async (req, res) => {
    try {
      const { month } = req.params;

      if (!/^\d{2}$/.test(month)) {
        throw new Error('Invalid month format. Please provide a two-digit month (e.g., "01" for January).');
      }

      const query = `
        SELECT *
        FROM WeatherEvent
        WHERE MONTH(eventBeginTime) = ?;
      `;

      const [results] = await db.query(query, [month]);
      res.json(results);
    } catch (error) {
      res.status(400).json({ error: error.message }); 
    }
  },
};

module.exports = weatherEventModel;
