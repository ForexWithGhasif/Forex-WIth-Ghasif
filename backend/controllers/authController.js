const authService = require('../services/authService');
const { setSessionCookie, clearSessionCookie } = require('../services/sessionService');

async function postSignup(req, res, next) {
  try {
    const user = await authService.registerUser(req.body || {});
    setSessionCookie(res, user.id);
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
}

async function postSignin(req, res, next) {
  try {
    const user = await authService.loginUser(req.body || {});
    setSessionCookie(res, user.id);
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
}

function postSignout(req, res) {
  clearSessionCookie(res);
  res.status(200).json({ success: true });
}

async function getMe(req, res, next) {
  try {
    const user = await authService.getUserById(req.userId);
    if (!user) return res.status(401).json({ success: false, message: 'Not authenticated.' });
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
}

module.exports = { postSignup, postSignin, postSignout, getMe };
