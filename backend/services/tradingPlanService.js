const db = require('../db/pool');

function toSafePlan(row) {
  return {
    id: row.id,
    session: row.session,
    symbols: row.symbols,
    strategy: row.strategy,
    entryRules: row.entry_rules,
    slRules: row.sl_rules,
    tpRules: row.tp_rules,
    riskPercent: row.risk_percent === null ? null : Number(row.risk_percent),
    maxDailyLoss: row.max_daily_loss === null ? null : Number(row.max_daily_loss),
    maxTrades: row.max_trades === null ? null : Number(row.max_trades),
    noTradeConditions: row.no_trade_conditions,
    createdAt: row.created_at,
  };
}

function validate({ session, strategy }) {
  const errors = [];
  if (!session || !session.trim()) errors.push('A session/plan name is required.');
  if (!strategy || !strategy.trim()) errors.push('A strategy description is required.');
  return errors;
}

async function listPlans(userId) {
  const res = await db.query('SELECT * FROM trading_plans WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  return res.rows.map(toSafePlan);
}

async function createPlan(userId, payload) {
  const errors = validate(payload);
  if (errors.length) { const e = new Error(errors.join(' ')); e.status = 400; throw e; }
  const { session, symbols, strategy, entryRules, slRules, tpRules, riskPercent, maxDailyLoss, maxTrades, noTradeConditions } = payload;
  const num = (v) => (v === '' || v === undefined || v === null ? null : Number(v));
  const res = await db.query(
    `INSERT INTO trading_plans (user_id, session, symbols, strategy, entry_rules, sl_rules, tp_rules, risk_percent, max_daily_loss, max_trades, no_trade_conditions)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
    [userId, session.trim(), symbols || null, strategy.trim(), entryRules || null, slRules || null, tpRules || null,
      num(riskPercent), num(maxDailyLoss), num(maxTrades), noTradeConditions || null]
  );
  return toSafePlan(res.rows[0]);
}

async function deletePlan(userId, planId) {
  const res = await db.query('DELETE FROM trading_plans WHERE id=$1 AND user_id=$2 RETURNING id', [planId, userId]);
  if (!res.rows.length) { const e = new Error('Plan not found.'); e.status = 404; throw e; }
}

module.exports = { listPlans, createPlan, deletePlan };
