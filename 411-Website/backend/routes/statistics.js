const express = require('express');
const router = express.Router();
const statisticsController = require('../models/statistics');

//this works 

// Total number of deaths for each weather event category
router.get('/total-deaths-by-category', statisticsController.totalDeathsByCategory);

// Average wind speed for severe tornadoes
router.get('/average-wind-speed-severe-tornadoes', statisticsController.averageWindSpeedSevereTornadoes);

module.exports = router;
