const SYMBOLS = [
  { pair: 'EUR/USD', symbol: 'EURUSD=X', decimals: 4 },
  { pair: 'GBP/USD', symbol: 'GBPUSD=X', decimals: 4 },
  { pair: 'XAU/USD', symbol: 'GC=F', decimals: 2 },
  { pair: 'USD/JPY', symbol: 'USDJPY=X', decimals: 2 },
  { pair: 'GBP/JPY', symbol: 'GBPJPY=X', decimals: 2 },
  { pair: 'AUD/USD', symbol: 'AUDUSD=X', decimals: 4 },
];

const CACHE_MS = 60 * 1000;
let cache = null;
let cacheTime = 0;

function formatPrice(price, decimals) {
  return price.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

async function fetchQuote({ pair, symbol, decimals }) {
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
  const dir = changePct >= 0 ? 'up' : 'down';

  return {
    pair,
    price: formatPrice(price, decimals),
    chg: `${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%`,
    dir,
  };
}

async function getLiveMarketPrices() {
  const now = Date.now();
  if (cache && now - cacheTime < CACHE_MS) return cache;

  const quotes = await Promise.all(SYMBOLS.map(fetchQuote));
  cache = quotes;
  cacheTime = now;
  return quotes;
}

module.exports = { getLiveMarketPrices };
