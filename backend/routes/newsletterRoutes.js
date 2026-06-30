const express = require('express');
const { postNewsletter } = require('../controllers/newsletterController');
const { newsletterRateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/', newsletterRateLimiter, postNewsletter);

module.exports = router;
