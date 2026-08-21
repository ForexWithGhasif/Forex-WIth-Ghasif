const express = require('express');
const { getMarketHistory } = require('../controllers/marketHistoryController');

const router = express.Router();

router.get('/', getMarketHistory);

module.exports = router;
