const db = require('../db'); 

const statisticsController = {
  totalDeathsByCategory: async (req, res) => {
    const query = `SELECT Category.category_name, 
                          SUM(WeatherEvent.deathsDirect) AS TotalDirectDeaths, 
                          SUM(WeatherEvent.deathsIndirect) AS TotalIndirectDeaths
                   FROM WeatherEvent 
                   JOIN Category ON WeatherEvent.category_id = Category.category_id
                   GROUP BY Category.category_name`;

    try {
      const [results] = await db.query(query);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  averageWindSpeedSevereTornadoes: async (req, res) => {
    const query = `SELECT AVG(Tornado.wind_speed) AS AverageWindSpeed
                   FROM Tornado 
                   JOIN WeatherEvent ON Tornado.event_id = WeatherEvent.event_id
                   JOIN (SELECT event_id FROM WeatherEvent ORDER BY damageProperty DESC LIMIT 10) AS TopEvents 
                   ON WeatherEvent.event_id = TopEvents.event_id`;

    try {
      const [results] = await db.query(query);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = statisticsController;
