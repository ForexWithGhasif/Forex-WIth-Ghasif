const service = require('../services/tradingAccountService');
const tradeService = require('../services/tradeService');

async function getAccounts(req, res, next) {
  try { res.status(200).json({ success: true, accounts: await service.listAccounts(req.userId) }); }
  catch (err) { next(err); }
}
async function postAccount(req, res, next) {
  try { res.status(201).json({ success: true, account: await service.createAccount(req.userId, req.body || {}) }); }
  catch (err) { next(err); }
}
async function putAccount(req, res, next) {
  try { res.status(200).json({ success: true, account: await service.updateAccount(req.userId, req.params.id, req.body || {}) }); }
  catch (err) { next(err); }
}
async function deleteAccountHandler(req, res, next) {
  try { await service.deleteAccount(req.userId, req.params.id); res.status(200).json({ success: true }); }
  catch (err) { next(err); }
}
async function getAccountStats(req, res, next) {
  try { res.status(200).json({ success: true, stats: await tradeService.getAccountStats(req.userId, req.params.id) }); }
  catch (err) { next(err); }
}

module.exports = { getAccounts, postAccount, putAccount, deleteAccountHandler, getAccountStats };
