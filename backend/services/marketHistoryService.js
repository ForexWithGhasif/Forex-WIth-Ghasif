/* Real historical OHLC candles for the Backtesting replay terminal — no
   synthetic/sample data. Same trusted, keyless source as marketDataService.js
   (Yahoo Finance's public chart API). Metals have no free spot history API
   (gold-api.com, used for the live spot quotes elsewhere, only ever returns
   the current price), so XAU/USD and XAG/USD here are sourced from COMEX
   futures (GC=F / SI=F) instead — real historical prices, just from the
   futures contract rather than spot, which is why they're labeled as such. */

const YAHOO_SYMBOLS = {
  XAUUSD: { ticker: 'GC=F', label: 'XAU/USD (COMEX futures history)', hasVolume: true },
  XAGUSD: { ticker: 'SI=F', label: 'XAG/USD (COMEX futures history)', hasVolume: true },
  EURUSD: { ticker: 'EURUSD=X', label: 'EUR/USD', hasVolume: false },
  GBPUSD: { ticker: 'GBPUSD=X', label: 'GBP/USD', hasVolume: false },
  USDJPY: { ticker: 'USDJPY=X', label: 'USD/JPY', hasVolume: false },
  AUDUSD: { ticker: 'AUDUSD=X', label: 'AUD/USD', hasVolume: false },
  USDCAD: { ticker: 'USDCAD=X', label: 'USD/CAD', hasVolume: false },
  USDCHF: { ticker: 'USDCHF=X', label: 'USD/CHF', hasVolume: false },
};

/* Each timeframe's `maxDays` mirrors Yahoo's own real lookback limits for
   that interval (confirmed live: a too-old request comes back with a real
   error like "15m data not available ... must be within the last 60 days")
   — surfaced to the user rather than silently failing. */
const TIMEFRAMES = {
  M15: { interval: '15m', range: '5d', maxDays: 60 },
  M30: { interval: '30m', range: '1mo', maxDays: 60 },
  H1: { interval: '60m', range: '3mo', maxDays: 730 },
  H4: { interval: '60m', range: '6mo', maxDays: 730, aggregateHours: 4 },
  D1: { interval: '1d', range: '2y', maxDays: null },
  W1: { interval: '1d', range: '5y', maxDays: null, aggregateDays: 7 },
};

const MAX_CANDLES = 3000; // sanity cap so a huge date range can't hand the chart an unbounded dataset
const CACHE_MS = 5 * 60 * 1000;
const cache = new Map(); // "SYMBOL|TIMEFRAME|from|to" -> { data, time }

async function fetchYahooChart(ticker, interval, { range, period1, period2 }) {
  const params = new URLSearchParams({ interval });
  if (period1 != null && period2 != null) { params.set('period1', String(period1)); params.set('period2', String(period2)); }
  else params.set('range', range);
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?${params.toString()}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const json = await res.json().catch(() => null);
  const chartErr = json && json.chart && json.chart.error;
  if (chartErr) { const e = new Error(chartErr.description || chartErr.code || 'Historical data request failed.'); e.status = 422; throw e; }
  if (!res.ok) throw new Error(`Yahoo chart fetch failed (${res.status}) for ${ticker}`);
  const result = json && json.chart && json.chart.result && json.chart.result[0];
  if (!result || !result.timestamp) throw new Error(`No chart data for ${ticker}`);
  const q = result.indicators.quote[0];
  const bars = [];
  for (let i = 0; i < result.timestamp.length; i++) {
    if (q.open[i] == null || q.high[i] == null || q.low[i] == null || q.close[i] == null) continue;
    bars.push({ time: result.timestamp[i], open: q.open[i], high: q.high[i], low: q.low[i], close: q.close[i], volume: q.volume[i] || 0 });
  }
  return bars;
}

/* Yahoo has no native 4h/1w interval — bucket real bars ourselves.
   This is downsampling real data, not fabricating it. */
function aggregateBars(bars, bucketSec) {
  const buckets = new Map();
  for (const b of bars) {
    const key = Math.floor(b.time / bucketSec) * bucketSec;
    const cur = buckets.get(key);
    if (!cur) buckets.set(key, { time: key, open: b.open, high: b.high, low: b.low, close: b.close, volume: b.volume });
    else { cur.high = Math.max(cur.high, b.high); cur.low = Math.min(cur.low, b.low); cur.close = b.close; cur.volume += b.volume; }
  }
  return [...buckets.values()].sort((a, b) => a.time - b.time);
}

async function getHistoricalCandles(symbol, timeframe, { from, to } = {}) {
  const sym = YAHOO_SYMBOLS[symbol];
  const tf = TIMEFRAMES[timeframe];
  if (!sym || !tf) { const e = new Error('Unsupported symbol or timeframe.'); e.status = 400; throw e; }

  let period1 = null, period2 = null;
  if (from && to) {
    period1 = Math.floor(new Date(from).getTime() / 1000);
    period2 = Math.floor(new Date(to).getTime() / 1000) + 86400; // include the whole end day
    if (!Number.isFinite(period1) || !Number.isFinite(period2)) { const e = new Error('Invalid date range.'); e.status = 400; throw e; }
    if (period1 >= period2) { const e = new Error('Start date must be before end date.'); e.status = 400; throw e; }
    if (tf.maxDays != null) {
      const spanDays = (period2 - period1) / 86400;
      const daysAgoStart = (Date.now() / 1000 - period1) / 86400;
      if (spanDays > tf.maxDays || daysAgoStart > tf.maxDays) {
        const e = new Error(`${timeframe} data is only available for roughly the last ${tf.maxDays} days — pick a more recent range or a larger timeframe.`);
        e.status = 400; throw e;
      }
    }
  }

  const key = `${symbol}|${timeframe}|${from || ''}|${to || ''}`;
  const cached = cache.get(key);
  if (cached && Date.now() - cached.time < CACHE_MS) return cached.data;

  let bars = await fetchYahooChart(sym.ticker, tf.interval, period1 != null ? { period1, period2 } : { range: tf.range });
  if (tf.aggregateHours) bars = aggregateBars(bars, tf.aggregateHours * 3600);
  if (tf.aggregateDays) bars = aggregateBars(bars, tf.aggregateDays * 86400);

  // An explicit date range is honored in full (already bounded by period1/period2); otherwise keep a
  // bounded, most-recent window so a plain symbol/timeframe pick still loads a reasonable replay length.
  const candles = (period1 != null ? bars : bars.slice(-320)).slice(-MAX_CANDLES);
  if (!candles.length) { const e = new Error('No historical candles for that range — try a different date range or symbol.'); e.status = 404; throw e; }

  const data = { symbol, timeframe, label: sym.label, hasVolume: sym.hasVolume, candles, source: 'Yahoo Finance', fetchedAt: new Date().toISOString() };
  cache.set(key, { data, time: Date.now() });
  return data;
}

module.exports = { getHistoricalCandles, YAHOO_SYMBOLS, TIMEFRAMES };
