const express = require('express');
const { getMarketPrices } = require('../controllers/marketDataController');

const router = express.Router();

router.get('/', getMarketPrices);

module.exports = router;
