const { COOKIE_NAME, verifyToken } = require('../services/sessionService');

function requireAuth(req, res, next) {
  const token = req.cookies && req.cookies[COOKIE_NAME];
  if (!token) return res.status(401).json({ success: false, message: 'Not authenticated.' });
  try {
    const payload = verifyToken(token);
    req.userId = payload.sub;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Session expired. Please sign in again.' });
  }
}

module.exports = { requireAuth };
