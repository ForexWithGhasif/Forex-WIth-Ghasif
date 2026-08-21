/* Live economic calendar data, sourced from the same feed that powers
   ForexFactory's own calendar widget (published by FairEconomy, ForexFactory's
   calendar-data provider). Public and keyless, same trust model this project
   already uses for live market prices in marketDataService.js (Yahoo Finance,
   no API key). Cached briefly server-side so every visitor isn't a fresh
   upstream hit. */

const FEED_URL = 'https://nfs.faireconomy.media/ff_calendar_thisweek.json';
const SOURCE_LABEL = "ForexFactory's economic calendar (FairEconomy live feed)";
const CACHE_MS = 5 * 60 * 1000;

let cache = null;
let cacheTime = 0;

function normalizeImpact(raw) {
  const v = String(raw || '').toLowerCase();
  if (v === 'high' || v === 'medium' || v === 'low') return v;
  return 'holiday'; // the feed flags bank holidays with a non High/Medium/Low label
}

function normalizeEvent(raw, i) {
  return {
    id: `${raw.date}-${raw.country}-${i}`,
    dateTime: raw.date, // full ISO 8601 with source offset; client renders it in the visitor's own timezone
    currency: raw.country || '',
    impact: normalizeImpact(raw.impact),
    title: raw.title || 'Untitled event',
    actual: raw.actual || '',
    forecast: raw.forecast || '',
    previous: raw.previous || '',
  };
}

async function getLiveEconomicCalendar() {
  const now = Date.now();
  if (cache && now - cacheTime < CACHE_MS) return cache;

  const res = await fetch(FEED_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`Economic calendar feed responded ${res.status}`);
  const raw = await res.json();
  if (!Array.isArray(raw)) throw new Error('Unexpected economic calendar feed shape');

  const events = raw
    .map(normalizeEvent)
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  cache = { events, source: SOURCE_LABEL, fetchedAt: new Date().toISOString() };
  cacheTime = now;
  return cache;
}

module.exports = { getLiveEconomicCalendar };
