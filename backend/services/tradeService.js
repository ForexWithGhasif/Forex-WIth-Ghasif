const db = require('../db/pool');

const DIRECTIONS = ['Buy', 'Sell'];
const RESULTS = ['Win', 'Loss', 'Breakeven'];
const CHECKLIST_KEYS = ['marketStructure','liquidity','setupConfirmation','entry','stopLoss','takeProfit','risk','newsCheck','planFollowed'];

function toSafeTrade(row) {
  return {
    id: row.id,
    date: row.trade_date,
    symbol: row.symbol,
    direction: row.direction,
    entry: Number(row.entry_price),
    exit: Number(row.exit_price),
    stopLoss: row.stop_loss === null || row.stop_loss === undefined ? null : Number(row.stop_loss),
    takeProfit: row.take_profit === null || row.take_profit === undefined ? null : Number(row.take_profit),
    result: row.result,
    riskReward: row.risk_reward === null ? null : Number(row.risk_reward),
    riskPercent: row.risk_percent === null || row.risk_percent === undefined ? null : Number(row.risk_percent),
    rMultiple: row.r_multiple === null || row.r_multiple === undefined ? null : Number(row.r_multiple),
    pnl: Number(row.pnl),
    strategy: row.strategy || null,
    notes: row.notes || null,
    accountId: row.account_id || null,
    tradingPlanId: row.trading_plan_id || null,
    checklist: row.checklist || null,
    source: row.source || 'manual',
  };
}

function sanitizeChecklist(checklist) {
  if (!checklist || typeof checklist !== 'object') return null;
  const clean = {};
  for (const key of CHECKLIST_KEYS) clean[key] = !!checklist[key];
  return clean;
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

const num = (v) => (v === '' || v === undefined || v === null ? null : Number(v));

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
  const { date, symbol, direction, entry, exit, stopLoss, takeProfit, result, riskReward, riskPercent, rMultiple,
    pnl, strategy, notes, accountId, tradingPlanId, checklist, source } = payload;
  const res = await db.query(
    `INSERT INTO trades (user_id, trade_date, symbol, direction, entry_price, exit_price, stop_loss, take_profit,
       result, risk_reward, risk_percent, r_multiple, pnl, strategy, notes, account_id, trading_plan_id, checklist, source)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING *`,
    [userId, date, symbol.trim().toUpperCase(), direction, Number(entry), Number(exit), num(stopLoss), num(takeProfit),
      result, num(riskReward), num(riskPercent), num(rMultiple), Number(pnl),
      strategy ? strategy.trim() : null, notes ? notes.trim() : null,
      accountId || null, tradingPlanId || null,
      checklist ? JSON.stringify(sanitizeChecklist(checklist)) : null,
      source === 'backtest' ? 'backtest' : 'manual']
  );
  return toSafeTrade(res.rows[0]);
}

async function listTradesForUser(userId, { limit = 200, from, to } = {}) {
  const conditions = ['user_id = $1'];
  const params = [userId];
  if (from) { params.push(from); conditions.push(`trade_date >= $${params.length}`); }
  if (to) { params.push(to); conditions.push(`trade_date <= $${params.length}`); }
  params.push(limit);
  const res = await db.query(
    `SELECT * FROM trades WHERE ${conditions.join(' AND ')} ORDER BY trade_date DESC, id DESC LIMIT $${params.length}`,
    params
  );
  return res.rows.map(toSafeTrade);
}

async function deleteTrade(userId, tradeId) {
  const res = await db.query('DELETE FROM trades WHERE id=$1 AND user_id=$2 RETURNING id', [tradeId, userId]);
  if (!res.rows.length) { const e = new Error('Trade not found.'); e.status = 404; throw e; }
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

function computeLongestStreaks(tradesOldestFirst) {
  let longestWin = 0, longestLoss = 0, curWin = 0, curLoss = 0;
  for (const t of tradesOldestFirst) {
    if (t.result === 'Win') { curWin++; curLoss = 0; if (curWin > longestWin) longestWin = curWin; }
    else if (t.result === 'Loss') { curLoss++; curWin = 0; if (curLoss > longestLoss) longestLoss = curLoss; }
    else { curWin = 0; curLoss = 0; }
  }
  return { longestWin, longestLoss };
}

function computeDrawdownCurve(equityCurve) {
  let peak = equityCurve.length ? equityCurve[0].balance : 0;
  return equityCurve.map(p => {
    if (p.balance > peak) peak = p.balance;
    const drawdown = peak > 0 ? ((peak - p.balance) / peak) * 100 : 0;
    return { date: p.date, drawdownPct: drawdown };
  });
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

async function getPerformanceStats(userId, { from, to } = {}) {
  const userRes = await db.query('SELECT starting_balance FROM users WHERE id = $1', [userId]);
  const startingBalance = userRes.rows[0] && userRes.rows[0].starting_balance !== null
    ? Number(userRes.rows[0].starting_balance) : null;

  const tradesNewestFirst = await listTradesForUser(userId, { limit: 5000, from, to });
  const hasTrades = tradesNewestFirst.length > 0;
  if (!hasTrades) {
    return {
      hasTrades: false, totalTrades: 0, winRate: null, netPnl: 0, profitFactor: null, avgR: null,
      maxDrawdownPct: 0, bestTrade: null, worstTrade: null, longestWinStreak: 0, longestLossStreak: 0,
      equityCurve: [], drawdownCurve: [], monthly: [], bySymbol: [], byStrategy: [],
    };
  }

  const tradesOldestFirst = [...tradesNewestFirst].reverse();
  const wins = tradesNewestFirst.filter(t => t.result === 'Win');
  const losses = tradesNewestFirst.filter(t => t.result === 'Loss');
  const decisive = wins.length + losses.length;
  const netPnl = tradesNewestFirst.reduce((s, t) => s + t.pnl, 0);
  const grossProfit = wins.reduce((s, t) => s + Math.max(t.pnl, 0), 0);
  const grossLoss = Math.abs(losses.reduce((s, t) => s + Math.min(t.pnl, 0), 0));
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : (grossProfit > 0 ? null : null);

  const rValues = tradesNewestFirst.map(t => t.rMultiple !== null ? t.rMultiple : t.riskReward).filter(v => v !== null && Number.isFinite(v));
  const avgR = rValues.length ? rValues.reduce((a,b)=>a+b,0)/rValues.length : null;

  const base = startingBalance !== null ? startingBalance : 0;
  let running = base;
  const equityCurve = [{ date: null, balance: running }];
  for (const t of tradesOldestFirst) { running += t.pnl; equityCurve.push({ date: t.date, balance: running }); }
  const drawdownCurve = computeDrawdownCurve(equityCurve);
  const { longestWin, longestLoss } = computeLongestStreaks(tradesOldestFirst);

  const bestTrade = tradesNewestFirst.reduce((best, t) => (!best || t.pnl > best.pnl) ? t : best, null);
  const worstTrade = tradesNewestFirst.reduce((worst, t) => (!worst || t.pnl < worst.pnl) ? t : worst, null);

  const monthlyMap = new Map();
  for (const t of tradesOldestFirst) {
    const key = String(t.date).slice(0, 7);
    if (!monthlyMap.has(key)) monthlyMap.set(key, { month: key, pnl: 0, trades: 0 });
    const m = monthlyMap.get(key); m.pnl += t.pnl; m.trades += 1;
  }

  const symbolMap = new Map();
  for (const t of tradesNewestFirst) {
    if (!symbolMap.has(t.symbol)) symbolMap.set(t.symbol, { symbol: t.symbol, trades: 0, wins: 0, decisive: 0, pnl: 0 });
    const s = symbolMap.get(t.symbol); s.trades += 1; s.pnl += t.pnl;
    if (t.result !== 'Breakeven') { s.decisive += 1; if (t.result === 'Win') s.wins += 1; }
  }
  const bySymbol = [...symbolMap.values()].map(s => ({ symbol: s.symbol, trades: s.trades, pnl: s.pnl, winRate: s.decisive ? (s.wins/s.decisive)*100 : null }))
    .sort((a,b) => b.trades - a.trades);

  const strategyMap = new Map();
  for (const t of tradesNewestFirst) {
    const key = t.strategy || 'Unspecified';
    if (!strategyMap.has(key)) strategyMap.set(key, { strategy: key, trades: 0, wins: 0, decisive: 0, pnl: 0 });
    const s = strategyMap.get(key); s.trades += 1; s.pnl += t.pnl;
    if (t.result !== 'Breakeven') { s.decisive += 1; if (t.result === 'Win') s.wins += 1; }
  }
  const byStrategy = [...strategyMap.values()].map(s => ({ strategy: s.strategy, trades: s.trades, pnl: s.pnl, winRate: s.decisive ? (s.wins/s.decisive)*100 : null }))
    .sort((a,b) => b.trades - a.trades);

  return {
    hasTrades: true,
    totalTrades: tradesNewestFirst.length,
    winRate: decisive > 0 ? (wins.length / decisive) * 100 : null,
    netPnl,
    profitFactor,
    avgR,
    maxDrawdownPct: computeMaxDrawdownPct(equityCurve),
    bestTrade, worstTrade,
    longestWinStreak: longestWin,
    longestLossStreak: longestLoss,
    equityCurve, drawdownCurve,
    monthly: [...monthlyMap.values()],
    bySymbol, byStrategy,
  };
}

module.exports = { createTrade, listTradesForUser, deleteTrade, getDashboardStats, setStartingBalance, getPerformanceStats };
