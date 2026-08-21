const express = require('express');
const { getEconomicCalendar } = require('../controllers/economicCalendarController');

const router = express.Router();

router.get('/', getEconomicCalendar);

module.exports = router;
