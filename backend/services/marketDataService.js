/* Forex pairs come from Yahoo Finance's spot FX quotes (accurate, matches
   what a forex chart shows). Gold specifically does NOT use Yahoo's "GC=F"
   symbol — that's the COMEX gold FUTURES contract, which trades at a real,
   persistent premium over spot (contango), so it never matched the XAUUSD
   spot price shown on TradingView/most retail platforms. Gold instead uses
   gold-api.com, a free no-key spot-metal price API, so the number visitors
   see actually matches what they'd see elsewhere as "XAU/USD". */
const FX_SYMBOLS = [
  { pair: 'EUR/USD', symbol: 'EURUSD=X', decimals: 4 },
  { pair: 'GBP/USD', symbol: 'GBPUSD=X', decimals: 4 },
  { pair: 'USD/JPY', symbol: 'USDJPY=X', decimals: 2 },
  { pair: 'GBP/JPY', symbol: 'GBPJPY=X', decimals: 2 },
  { pair: 'AUD/USD', symbol: 'AUDUSD=X', decimals: 4 },
];

const CACHE_MS = 60 * 1000;
let cache = null; // last fully-successful array, keyed by nothing — just the ordered quotes
let cacheByPair = {}; // pair -> last known good quote, for partial-failure fallback
let cacheTime = 0;

function formatPrice(price, decimals) {
  return price.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

async function fetchFxQuote({ pair, symbol, decimals }) {
  const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}`, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  if (!res.ok) throw new Error(`Quote fetch failed for ${symbol}`);
  const json = await res.json();
  const meta = json && json.chart && json.chart.result && json.chart.result[0] && json.chart.result[0].meta;
  if (!meta || typeof meta.regularMarketPrice !== 'number') throw new Error(`No quote data for ${symbol}`);

  const price = meta.regularMarketPrice;
  const prevClose = meta.previousClose || meta.chartPreviousClose || price;
  const changePct = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;

  return {
    pair,
    price: formatPrice(price, decimals),
    chg: `${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%`,
    dir: changePct >= 0 ? 'up' : 'down',
  };
}

/* gold-api.com returns only the current spot price, no previous-close, so
   the daily %-change is computed against the first price we saw on the
   current UTC calendar day (reset automatically at each UTC midnight). This
   is a real, live-computed change — not fabricated — just derived locally
   instead of coming pre-calculated from the upstream API. */
let goldDayRef = { day: null, price: null };
function utcDateKey(d) { return d.toISOString().slice(0, 10); }

async function fetchSpotGoldQuote() {
  const res = await fetch('https://api.gold-api.com/price/XAU', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error('Gold quote fetch failed');
  const json = await res.json();
  if (!json || typeof json.price !== 'number') throw new Error('No gold quote data');

  const price = json.price;
  const today = utcDateKey(new Date());
  if (goldDayRef.day !== today) goldDayRef = { day: today, price };
  const changePct = goldDayRef.price ? ((price - goldDayRef.price) / goldDayRef.price) * 100 : 0;

  return {
    pair: 'XAU/USD',
    price: formatPrice(price, 2),
    chg: `${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%`,
    dir: changePct >= 0 ? 'up' : 'down',
  };
}

const QUOTE_TASKS = [
  { pair: 'EUR/USD', fetcher: () => fetchFxQuote(FX_SYMBOLS[0]) },
  { pair: 'GBP/USD', fetcher: () => fetchFxQuote(FX_SYMBOLS[1]) },
  { pair: 'XAU/USD', fetcher: fetchSpotGoldQuote },
  { pair: 'USD/JPY', fetcher: () => fetchFxQuote(FX_SYMBOLS[2]) },
  { pair: 'GBP/JPY', fetcher: () => fetchFxQuote(FX_SYMBOLS[3]) },
  { pair: 'AUD/USD', fetcher: () => fetchFxQuote(FX_SYMBOLS[4]) },
];

async function getLiveMarketPrices() {
  const now = Date.now();
  if (cache && now - cacheTime < CACHE_MS) {
    return { data: cache, updatedAt: cacheTime, stale: false };
  }

  const settled = await Promise.allSettled(QUOTE_TASKS.map(t => t.fetcher()));
  const allOk = settled.every(r => r.status === 'fulfilled');

  const merged = settled.map((r, i) => {
    if (r.status === 'fulfilled') {
      cacheByPair[QUOTE_TASKS[i].pair] = r.value;
      return r.value;
    }
    console.error(`Market data refresh failed for ${QUOTE_TASKS[i].pair}:`, r.reason && r.reason.message);
    return cacheByPair[QUOTE_TASKS[i].pair] || null;
  }).filter(Boolean);

  if (!merged.length) {
    if (cache) return { data: cache, updatedAt: cacheTime, stale: true };
    throw new Error('No market data available');
  }

  if (allOk) {
    cache = merged;
    cacheTime = now;
    return { data: merged, updatedAt: cacheTime, stale: false };
  }
  // Partial failure: serve the best-effort merge, but don't advance the
  // "last verified fully fresh" timestamp, and flag it as stale.
  return { data: merged, updatedAt: cacheTime || now, stale: true };
}

module.exports = { getLiveMarketPrices };
