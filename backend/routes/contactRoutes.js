const express = require('express');
const { postContact } = require('../controllers/contactController');
const { contactRateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/', contactRateLimiter, postContact);

module.exports = router;
