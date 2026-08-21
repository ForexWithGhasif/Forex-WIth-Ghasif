const { getLiveMarketPrices } = require('../services/marketDataService');

async function getMarketPrices(req, res, next) {
  try {
    const { data, updatedAt, stale } = await getLiveMarketPrices();
    res.status(200).json({ success: true, data, stale, updatedAt: new Date(updatedAt).toISOString() });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMarketPrices };
