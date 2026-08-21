const bcrypt = require('bcryptjs');
const db = require('../db/pool');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SALT_ROUNDS = 10;

function toSafeUser(row) {
  return {
    id: row.id, fullName: row.full_name, email: row.email, createdAt: row.created_at,
    startingBalance: row.starting_balance === undefined || row.starting_balance === null ? null : Number(row.starting_balance),
  };
}

function validateSignup({ fullName, email, password, confirmPassword }) {
  const errors = [];
  if (!fullName || !fullName.trim()) errors.push('Full name is required.');
  else if (fullName.trim().length > 200) errors.push('Full name is too long.');

  if (!email || !EMAIL_RE.test(email.trim())) errors.push('A valid email is required.');

  if (!password || password.length < 8) errors.push('Password must be at least 8 characters.');
  else if (password.length > 200) errors.push('Password is too long.');

  if (password !== confirmPassword) errors.push('Passwords do not match.');

  return errors;
}

async function registerUser({ fullName, email, password, confirmPassword }) {
  const errors = validateSignup({ fullName, email, password, confirmPassword });
  if (errors.length) {
    const error = new Error(errors.join(' '));
    error.status = 400;
    throw error;
  }

  const cleanEmail = email.trim().toLowerCase();
  const existing = await db.query('SELECT id FROM users WHERE email = $1', [cleanEmail]);
  if (existing.rows.length) {
    const error = new Error('An account with that email already exists.');
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await db.query(
    'INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, full_name, email, created_at, starting_balance',
    [fullName.trim(), cleanEmail, passwordHash]
  );
  return toSafeUser(result.rows[0]);
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    const error = new Error('Email and password are required.');
    error.status = 400;
    throw error;
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const result = await db.query('SELECT * FROM users WHERE email = $1', [cleanEmail]);
  const row = result.rows[0];

  /* Same "invalid email or password" message either way — never reveal
     whether the email exists, so a login attempt can't be used to probe
     for registered accounts. */
  const invalid = () => { const error = new Error('Invalid email or password.'); error.status = 401; throw error; };
  if (!row) invalid();

  const match = await bcrypt.compare(password, row.password_hash);
  if (!match) invalid();

  return toSafeUser(row);
}

async function getUserById(id) {
  const result = await db.query('SELECT id, full_name, email, created_at, starting_balance FROM users WHERE id = $1', [id]);
  if (!result.rows.length) return null;
  return toSafeUser(result.rows[0]);
}

module.exports = { registerUser, loginUser, getUserById };
