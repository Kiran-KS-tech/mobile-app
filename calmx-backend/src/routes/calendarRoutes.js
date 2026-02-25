const express = require('express');
const router = express.Router();
const { syncCalendar } = require('../controllers/calendarController');
const { protect } = require('../middlewares/authMiddleware');

// @route   POST /api/calendar/sync
// @access  Private
router.post('/sync', protect, syncCalendar);

module.exports = router;
