const express = require('express');
const router = express.Router();
const { getUserSummary } = require('../controllers/summaryController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getUserSummary);

module.exports = router;
