const db = require('../db'); // Import your database connection or pool

const weatherEventModel = {
  getWeatherEventsByMonth: async (req, res) => {
    try {
      const { month } = req.params; // Extract month from URL params

      // Check if the month parameter is in the correct format
      if (!/^\d{2}$/.test(month)) {
        throw new Error('Invalid month format. Please provide a two-digit month (e.g., "01" for January).');
      }

      // Your SQL query to retrieve weather events for a specific month
      const query = `
        SELECT *
        FROM WeatherEvent
        WHERE MONTH(eventBeginTime) = ?;
      `;

      const [results] = await db.query(query, [month]);
      res.json(results); // Send the results as JSON response
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handle errors and send an error response
    }
  },
};

module.exports = weatherEventModel;
