const { getLiveMarketPrices } = require('../services/marketDataService');

async function getMarketPrices(req, res, next) {
  try {
    const data = await getLiveMarketPrices();
    res.status(200).json({ success: true, data, updatedAt: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMarketPrices };
