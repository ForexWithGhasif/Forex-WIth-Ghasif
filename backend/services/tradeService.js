const db = require('../db/pool');

const DIRECTIONS = ['Buy', 'Sell'];
const RESULTS = ['Win', 'Loss', 'Breakeven'];

function toSafeTrade(row) {
  return {
    id: row.id,
    date: row.trade_date,
    symbol: row.symbol,
    direction: row.direction,
    entry: Number(row.entry_price),
    exit: Number(row.exit_price),
    result: row.result,
    riskReward: row.risk_reward === null ? null : Number(row.risk_reward),
    pnl: Number(row.pnl),
  };
}

function validateTrade({ date, symbol, direction, entry, exit, result, riskReward, pnl }) {
  const errors = [];
  if (!date || isNaN(Date.parse(date))) errors.push('A valid trade date is required.');
  if (!symbol || !symbol.trim()) errors.push('Symbol is required.');
  else if (symbol.trim().length > 20) errors.push('Symbol is too long.');
  if (!DIRECTIONS.includes(direction)) errors.push('Direction must be Buy or Sell.');
  if (entry === undefined || entry === null || isNaN(Number(entry))) errors.push('A valid entry price is required.');
  if (exit === undefined || exit === null || isNaN(Number(exit))) errors.push('A valid exit price is required.');
  if (!RESULTS.includes(result)) errors.push('Result must be Win, Loss, or Breakeven.');
  if (riskReward !== undefined && riskReward !== null && riskReward !== '' && isNaN(Number(riskReward))) errors.push('Risk/reward must be a number.');
  if (pnl === undefined || pnl === null || isNaN(Number(pnl))) errors.push('A valid profit/loss amount is required.');
  return errors;
}

/* Every query here is scoped by user_id (from the authenticated session, see
   requireAuth) — never accept a user/trade id from the request body as the
   ownership key, or one signed-in user could read or edit another's trades. */

async function createTrade(userId, payload) {
  const errors = validateTrade(payload);
  if (errors.length) {
    const error = new Error(errors.join(' '));
    error.status = 400;
    throw error;
  }
  const { date, symbol, direction, entry, exit, result, riskReward, pnl } = payload;
  const res = await db.query(
    `INSERT INTO trades (user_id, trade_date, symbol, direction, entry_price, exit_price, result, risk_reward, pnl)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [userId, date, symbol.trim().toUpperCase(), direction, Number(entry), Number(exit), result,
      riskReward === '' || riskReward === undefined || riskReward === null ? null : Number(riskReward), Number(pnl)]
  );
  return toSafeTrade(res.rows[0]);
}

async function listTradesForUser(userId, limit = 200) {
  const res = await db.query(
    'SELECT * FROM trades WHERE user_id = $1 ORDER BY trade_date DESC, id DESC LIMIT $2',
    [userId, limit]
  );
  return res.rows.map(toSafeTrade);
}

function computeCurrentStreak(tradesNewestFirst) {
  const meaningful = tradesNewestFirst.filter(t => t.result !== 'Breakeven');
  if (!meaningful.length) return { count: 0, type: null };
  const type = meaningful[0].result;
  let count = 0;
  for (const t of meaningful) {
    if (t.result === type) count++;
    else break;
  }
  return { count, type };
}

function computeMaxDrawdownPct(equityCurve) {
  if (equityCurve.length < 2) return 0;
  let peak = equityCurve[0].balance;
  let maxDrawdown = 0;
  for (const point of equityCurve) {
    if (point.balance > peak) peak = point.balance;
    if (peak > 0) {
      const drawdown = ((peak - point.balance) / peak) * 100;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    }
  }
  return maxDrawdown;
}

async function getDashboardStats(userId) {
  const userRes = await db.query('SELECT starting_balance FROM users WHERE id = $1', [userId]);
  const startingBalance = userRes.rows[0] && userRes.rows[0].starting_balance !== null
    ? Number(userRes.rows[0].starting_balance) : null;

  const tradesNewestFirst = await listTradesForUser(userId);
  const hasTrades = tradesNewestFirst.length > 0;

  if (!hasTrades) {
    return {
      hasTrades: false,
      startingBalance,
      accountBalance: startingBalance,
      totalTrades: 0, winRate: null, profitLoss: 0, avgRiskReward: null,
      maxDrawdownPct: 0, currentStreak: { count: 0, type: null },
      equityCurve: [], recentTrades: [],
    };
  }

  const tradesOldestFirst = [...tradesNewestFirst].reverse();
  const wins = tradesNewestFirst.filter(t => t.result === 'Win').length;
  const decisive = tradesNewestFirst.filter(t => t.result !== 'Breakeven').length;
  const profitLoss = tradesNewestFirst.reduce((sum, t) => sum + t.pnl, 0);
  const rrValues = tradesNewestFirst.map(t => t.riskReward).filter(v => v !== null && Number.isFinite(v));
  const avgRiskReward = rrValues.length ? rrValues.reduce((a, b) => a + b, 0) / rrValues.length : null;

  const base = startingBalance !== null ? startingBalance : 0;
  let running = base;
  const equityCurve = [{ date: null, balance: running }];
  for (const t of tradesOldestFirst) {
    running += t.pnl;
    equityCurve.push({ date: t.date, balance: running });
  }

  return {
    hasTrades: true,
    startingBalance,
    accountBalance: startingBalance !== null ? startingBalance + profitLoss : null,
    totalTrades: tradesNewestFirst.length,
    winRate: decisive > 0 ? (wins / decisive) * 100 : null,
    profitLoss,
    avgRiskReward,
    maxDrawdownPct: computeMaxDrawdownPct(equityCurve),
    currentStreak: computeCurrentStreak(tradesNewestFirst),
    equityCurve,
    recentTrades: tradesNewestFirst.slice(0, 10),
  };
}

async function setStartingBalance(userId, startingBalance) {
  if (startingBalance !== null && (isNaN(Number(startingBalance)) || Number(startingBalance) < 0)) {
    const error = new Error('Enter a valid, non-negative starting balance.');
    error.status = 400;
    throw error;
  }
  await db.query('UPDATE users SET starting_balance = $1 WHERE id = $2', [startingBalance === null ? null : Number(startingBalance), userId]);
}

module.exports = { createTrade, listTradesForUser, getDashboardStats, setStartingBalance };
