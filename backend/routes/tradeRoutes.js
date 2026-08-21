const express = require('express');
const { postTrade, getTrades, deleteTradeHandler, getDashboard, getPerformance, putStartingBalance } = require('../controllers/tradeController');
const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();

/* Every route here requires a valid session — there is no per-user data
   without knowing who "the user" is. */
router.use(requireAuth);

router.get('/dashboard', getDashboard);
router.get('/performance', getPerformance);
router.get('/', getTrades);
router.post('/', postTrade);
router.delete('/:id', deleteTradeHandler);
router.put('/starting-balance', putStartingBalance);

module.exports = router;
