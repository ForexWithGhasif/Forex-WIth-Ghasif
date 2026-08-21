const { Pool } = require('pg');
const { databaseUrl } = require('../config/env');

let pool = null;
let schemaReady = null;

/* One connection per serverless invocation (max: 1) — the standard pattern
   for Postgres on Vercel/serverless: a normal multi-connection pool would
   quickly exhaust the database's connection limit since every invocation
   gets its own process. Use a pooled/serverless-mode connection string from
   your provider (e.g. Neon/Vercel Postgres's "-pooler" host) if available. */
function getPool() {
  if (!databaseUrl) {
    const error = new Error('The client area is not configured on the server.');
    error.status = 500;
    throw error;
  }
  if (!pool) {
    /* A `sslmode=require` (or similar) query param on the connection string
       makes `pg` derive its own strict TLS behavior from the URL, which can
       fight with — and override — the `ssl` option below, producing a
       "self-signed certificate in certificate chain" error even though
       rejectUnauthorized:false is set. Stripping it here means our explicit
       ssl option is the only thing governing TLS. rejectUnauthorized:false
       is standard practice for managed Postgres providers (Supabase, Neon,
       Vercel Postgres) whose certificate chains aren't in Node's default
       trust store — the connection itself is still encrypted either way. */
    const cleanUrl = databaseUrl.replace(/([?&])sslmode=[^&]*&?/i, '$1').replace(/[?&]$/, '');
    pool = new Pool({
      connectionString: cleanUrl,
      max: 1,
      ssl: databaseUrl.includes('sslmode=disable') ? false : { rejectUnauthorized: false },
    });
  }
  return pool;
}

async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = getPool().query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        starting_balance NUMERIC,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      ALTER TABLE users ADD COLUMN IF NOT EXISTS starting_balance NUMERIC;

      CREATE TABLE IF NOT EXISTS trading_accounts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        starting_balance NUMERIC NOT NULL,
        risk_per_trade_pct NUMERIC,
        max_drawdown_pct NUMERIC,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS trading_accounts_user_id_idx ON trading_accounts(user_id);

      CREATE TABLE IF NOT EXISTS trading_plans (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        session TEXT,
        symbols TEXT,
        strategy TEXT,
        entry_rules TEXT,
        sl_rules TEXT,
        tp_rules TEXT,
        risk_percent NUMERIC,
        max_daily_loss NUMERIC,
        max_trades INTEGER,
        no_trade_conditions TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS trading_plans_user_id_idx ON trading_plans(user_id);

      CREATE TABLE IF NOT EXISTS trades (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        trade_date DATE NOT NULL,
        symbol TEXT NOT NULL,
        direction TEXT NOT NULL CHECK (direction IN ('Buy','Sell')),
        entry_price NUMERIC NOT NULL,
        exit_price NUMERIC NOT NULL,
        result TEXT NOT NULL CHECK (result IN ('Win','Loss','Breakeven')),
        risk_reward NUMERIC,
        pnl NUMERIC NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS trades_user_id_idx ON trades(user_id);

      -- Trading Journal upgrade: the same trades table now backs both manual
      -- journal entries and (later) auto-saved backtest trades, kept apart
      -- via the source column. Every new column is nullable so Phase 2's
      -- existing rows/queries keep working untouched.
      ALTER TABLE trades ADD COLUMN IF NOT EXISTS account_id INTEGER REFERENCES trading_accounts(id) ON DELETE SET NULL;
      ALTER TABLE trades ADD COLUMN IF NOT EXISTS stop_loss NUMERIC;
      ALTER TABLE trades ADD COLUMN IF NOT EXISTS take_profit NUMERIC;
      ALTER TABLE trades ADD COLUMN IF NOT EXISTS risk_percent NUMERIC;
      ALTER TABLE trades ADD COLUMN IF NOT EXISTS r_multiple NUMERIC;
      ALTER TABLE trades ADD COLUMN IF NOT EXISTS strategy TEXT;
      ALTER TABLE trades ADD COLUMN IF NOT EXISTS notes TEXT;
      ALTER TABLE trades ADD COLUMN IF NOT EXISTS trading_plan_id INTEGER REFERENCES trading_plans(id) ON DELETE SET NULL;
      ALTER TABLE trades ADD COLUMN IF NOT EXISTS checklist JSONB;
      ALTER TABLE trades ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'manual';
    `).catch((err) => { schemaReady = null; throw err; });
  }
  return schemaReady;
}

async function query(text, params) {
  await ensureSchema();
  return getPool().query(text, params);
}

module.exports = { query };
