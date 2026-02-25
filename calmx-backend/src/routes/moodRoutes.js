const express = require('express');
const router = express.Router();
const { getMoods, logMood } = require('../controllers/moodController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getMoods).post(protect, logMood);

module.exports = router;
