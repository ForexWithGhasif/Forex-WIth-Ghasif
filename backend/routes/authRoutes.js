const express = require('express');
const { postSignup, postSignin, postSignout, getMe } = require('../controllers/authController');
const { authRateLimiter } = require('../middleware/rateLimiter');
const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();

router.post('/signup', authRateLimiter, postSignup);
router.post('/signin', authRateLimiter, postSignin);
router.post('/signout', postSignout);
router.get('/me', requireAuth, getMe);

module.exports = router;
