const tradeService = require('../services/tradeService');

/* req.userId comes only from the verified session cookie (see requireAuth)
   — never from the request body — so a trade always belongs to whoever is
   actually signed in. */

async function postTrade(req, res, next) {
  try {
    const trade = await tradeService.createTrade(req.userId, req.body || {});
    res.status(201).json({ success: true, trade });
  } catch (err) {
    next(err);
  }
}

async function getTrades(req, res, next) {
  try {
    const { from, to } = req.query;
    const trades = await tradeService.listTradesForUser(req.userId, { from, to });
    res.status(200).json({ success: true, trades });
  } catch (err) {
    next(err);
  }
}

async function deleteTradeHandler(req, res, next) {
  try {
    await tradeService.deleteTrade(req.userId, req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function getDashboard(req, res, next) {
  try {
    const stats = await tradeService.getDashboardStats(req.userId);
    res.status(200).json({ success: true, stats });
  } catch (err) {
    next(err);
  }
}

async function getPerformance(req, res, next) {
  try {
    const { from, to } = req.query;
    const stats = await tradeService.getPerformanceStats(req.userId, { from, to });
    res.status(200).json({ success: true, stats });
  } catch (err) {
    next(err);
  }
}

async function putStartingBalance(req, res, next) {
  try {
    const raw = req.body ? req.body.startingBalance : undefined;
    const value = raw === '' || raw === undefined ? null : raw;
    await tradeService.setStartingBalance(req.userId, value);
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { postTrade, getTrades, deleteTradeHandler, getDashboard, getPerformance, putStartingBalance };
