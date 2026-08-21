const { getHistoricalCandles } = require('../services/marketHistoryService');

async function getMarketHistory(req, res, next) {
  try {
    const { symbol, timeframe } = req.query;
    const data = await getHistoricalCandles(symbol, timeframe);
    res.status(200).json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMarketHistory };
