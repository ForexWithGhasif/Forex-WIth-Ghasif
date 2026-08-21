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
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `).catch((err) => { schemaReady = null; throw err; });
  }
  return schemaReady;
}

async function query(text, params) {
  await ensureSchema();
  return getPool().query(text, params);
}

module.exports = { query };
