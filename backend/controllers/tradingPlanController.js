const service = require('../services/tradingPlanService');

async function getPlans(req, res, next) {
  try { res.status(200).json({ success: true, plans: await service.listPlans(req.userId) }); }
  catch (err) { next(err); }
}
async function postPlan(req, res, next) {
  try { res.status(201).json({ success: true, plan: await service.createPlan(req.userId, req.body || {}) }); }
  catch (err) { next(err); }
}
async function deletePlanHandler(req, res, next) {
  try { await service.deletePlan(req.userId, req.params.id); res.status(200).json({ success: true }); }
  catch (err) { next(err); }
}

module.exports = { getPlans, postPlan, deletePlanHandler };
