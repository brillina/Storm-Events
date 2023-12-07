const express = require('express');
const router = express.Router();
const additionalController = require('../models/additional');

// Search functionality
router.get('/search', additionalController.searchWeatherEvents);

module.exports = router;
