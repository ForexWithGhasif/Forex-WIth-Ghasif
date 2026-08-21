/* Real historical OHLC candles for the Backtesting replay chart — no
   synthetic/sample data. Same trusted, keyless source as marketDataService.js
   (Yahoo Finance's public chart API) for forex pairs. Gold has no free spot
   history API (gold-api.com, used for the live spot quote elsewhere, only
   ever returns the current price) so XAU/USD here is sourced from COMEX
   gold futures (GC=F) instead — real historical prices, just from the
   futures contract rather than spot, which is why it's labeled as such. */

const YAHOO_SYMBOLS = {
  XAUUSD: { ticker: 'GC=F', label: 'XAU/USD (COMEX futures history)', hasVolume: true },
  EURUSD: { ticker: 'EURUSD=X', label: 'EUR/USD', hasVolume: false },
  GBPUSD: { ticker: 'GBPUSD=X', label: 'GBP/USD', hasVolume: false },
};

const TIMEFRAMES = {
  M15: { interval: '15m', range: '5d' },
  H1: { interval: '60m', range: '3mo' },
  H4: { interval: '60m', range: '6mo', aggregateHours: 4 },
  D1: { interval: '1d', range: '1y' },
};

const CACHE_MS = 5 * 60 * 1000;
const cache = new Map(); // "SYMBOL|TIMEFRAME" -> { data, time }

async function fetchYahooChart(ticker, interval, range) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=${range}&interval=${interval}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`Yahoo chart fetch failed (${res.status}) for ${ticker}`);
  const json = await res.json();
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

/* Yahoo has no native 4h interval — bucket real 1h bars into 4h bars
   ourselves. This is downsampling real data, not fabricating it. */
function aggregateHours(bars, hours) {
  const bucketSec = hours * 3600;
  const buckets = new Map();
  for (const b of bars) {
    const key = Math.floor(b.time / bucketSec) * bucketSec;
    const cur = buckets.get(key);
    if (!cur) buckets.set(key, { time: key, open: b.open, high: b.high, low: b.low, close: b.close, volume: b.volume });
    else { cur.high = Math.max(cur.high, b.high); cur.low = Math.min(cur.low, b.low); cur.close = b.close; cur.volume += b.volume; }
  }
  return [...buckets.values()].sort((a, b) => a.time - b.time);
}

async function getHistoricalCandles(symbol, timeframe) {
  const sym = YAHOO_SYMBOLS[symbol];
  const tf = TIMEFRAMES[timeframe];
  if (!sym || !tf) { const e = new Error('Unsupported symbol or timeframe.'); e.status = 400; throw e; }

  const key = `${symbol}|${timeframe}`;
  const cached = cache.get(key);
  if (cached && Date.now() - cached.time < CACHE_MS) return cached.data;

  let bars = await fetchYahooChart(sym.ticker, tf.interval, tf.range);
  if (tf.aggregateHours) bars = aggregateHours(bars, tf.aggregateHours);
  const candles = bars.slice(-320); // a bounded, most-recent window for a reasonable replay length

  const data = { symbol, timeframe, label: sym.label, hasVolume: sym.hasVolume, candles, source: 'Yahoo Finance', fetchedAt: new Date().toISOString() };
  cache.set(key, { data, time: Date.now() });
  return data;
}

module.exports = { getHistoricalCandles };
