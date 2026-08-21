const express = require('express');
const { getAccounts, postAccount, putAccount, deleteAccountHandler } = require('../controllers/tradingAccountController');
const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();
router.use(requireAuth);

router.get('/', getAccounts);
router.post('/', postAccount);
router.put('/:id', putAccount);
router.delete('/:id', deleteAccountHandler);

module.exports = router;
