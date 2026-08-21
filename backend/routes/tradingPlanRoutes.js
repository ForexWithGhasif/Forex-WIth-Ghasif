const express = require('express');
const { getPlans, postPlan, deletePlanHandler } = require('../controllers/tradingPlanController');
const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();
router.use(requireAuth);

router.get('/', getPlans);
router.post('/', postPlan);
router.delete('/:id', deletePlanHandler);

module.exports = router;
