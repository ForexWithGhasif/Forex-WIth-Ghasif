const jwt = require('jsonwebtoken');
const { jwtSecret, isProduction } = require('../config/env');

const COOKIE_NAME = 'fwg_session';
const TOKEN_TTL = '7d';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

function requireSecret() {
  if (!jwtSecret) {
    const error = new Error('The client area is not configured on the server.');
    error.status = 500;
    throw error;
  }
}

function verifyToken(token) {
  requireSecret();
  return jwt.verify(token, jwtSecret);
}

/* httpOnly + Secure (in production) cookie — never accessible to page JS,
   so there's nothing here for an XSS payload to steal, unlike a token kept
   in localStorage. sameSite:'lax' still allows it on normal top-level
   navigations (e.g. following a link to /client/dashboard). */
function setSessionCookie(res, userId) {
  requireSecret();
  const token = jwt.sign({ sub: userId }, jwtSecret, { expiresIn: TOKEN_TTL });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, secure: isProduction, sameSite: 'lax', path: '/' });
}

module.exports = { COOKIE_NAME, verifyToken, setSessionCookie, clearSessionCookie };
