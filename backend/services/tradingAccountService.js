const db = require('../db/pool');

function toSafeAccount(row) {
  return {
    id: row.id,
    name: row.name,
    startingBalance: Number(row.starting_balance),
    riskPerTradePct: row.risk_per_trade_pct === null ? null : Number(row.risk_per_trade_pct),
    maxDrawdownPct: row.max_drawdown_pct === null ? null : Number(row.max_drawdown_pct),
    createdAt: row.created_at,
  };
}

function validate({ name, startingBalance, riskPerTradePct, maxDrawdownPct }) {
  const errors = [];
  if (!name || !name.trim()) errors.push('Account name is required.');
  else if (name.trim().length > 100) errors.push('Account name is too long.');
  if (startingBalance === undefined || startingBalance === null || startingBalance === '' || isNaN(Number(startingBalance)) || Number(startingBalance) < 0) {
    errors.push('A valid starting balance is required.');
  }
  if (riskPerTradePct !== undefined && riskPerTradePct !== null && riskPerTradePct !== '' && (isNaN(Number(riskPerTradePct)) || Number(riskPerTradePct) < 0)) {
    errors.push('Risk per trade must be a non-negative number.');
  }
  if (maxDrawdownPct !== undefined && maxDrawdownPct !== null && maxDrawdownPct !== '' && (isNaN(Number(maxDrawdownPct)) || Number(maxDrawdownPct) < 0)) {
    errors.push('Maximum drawdown must be a non-negative number.');
  }
  return errors;
}

/* Every query is scoped by user_id (from the session) AND, for updates/
   deletes, by the row's own id — WHERE id=$1 AND user_id=$2 means a request
   for someone else's account id simply matches zero rows instead of ever
   touching another user's data. */

async function listAccounts(userId) {
  const res = await db.query('SELECT * FROM trading_accounts WHERE user_id = $1 ORDER BY created_at ASC', [userId]);
  return res.rows.map(toSafeAccount);
}

async function createAccount(userId, payload) {
  const errors = validate(payload);
  if (errors.length) { const e = new Error(errors.join(' ')); e.status = 400; throw e; }
  const { name, startingBalance, riskPerTradePct, maxDrawdownPct } = payload;
  const res = await db.query(
    `INSERT INTO trading_accounts (user_id, name, starting_balance, risk_per_trade_pct, max_drawdown_pct)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [userId, name.trim(), Number(startingBalance),
      riskPerTradePct === '' || riskPerTradePct === undefined || riskPerTradePct === null ? null : Number(riskPerTradePct),
      maxDrawdownPct === '' || maxDrawdownPct === undefined || maxDrawdownPct === null ? null : Number(maxDrawdownPct)]
  );
  return toSafeAccount(res.rows[0]);
}

async function updateAccount(userId, accountId, payload) {
  const errors = validate(payload);
  if (errors.length) { const e = new Error(errors.join(' ')); e.status = 400; throw e; }
  const { name, startingBalance, riskPerTradePct, maxDrawdownPct } = payload;
  const res = await db.query(
    `UPDATE trading_accounts SET name=$1, starting_balance=$2, risk_per_trade_pct=$3, max_drawdown_pct=$4
     WHERE id=$5 AND user_id=$6 RETURNING *`,
    [name.trim(), Number(startingBalance),
      riskPerTradePct === '' || riskPerTradePct === undefined || riskPerTradePct === null ? null : Number(riskPerTradePct),
      maxDrawdownPct === '' || maxDrawdownPct === undefined || maxDrawdownPct === null ? null : Number(maxDrawdownPct),
      accountId, userId]
  );
  if (!res.rows.length) { const e = new Error('Account not found.'); e.status = 404; throw e; }
  return toSafeAccount(res.rows[0]);
}

async function deleteAccount(userId, accountId) {
  const res = await db.query('DELETE FROM trading_accounts WHERE id=$1 AND user_id=$2 RETURNING id', [accountId, userId]);
  if (!res.rows.length) { const e = new Error('Account not found.'); e.status = 404; throw e; }
}

module.exports = { listAccounts, createAccount, updateAccount, deleteAccount };
