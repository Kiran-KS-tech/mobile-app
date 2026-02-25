const Mood = require('../models/Mood');

// @desc    Get user mood history
// @route   GET /api/mood
// @access  Private
const getMoods = async (req, res) => {
    try {
        const moods = await Mood.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(moods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Log a new mood/stress level
// @route   POST /api/mood
// @access  Private
const logMood = async (req, res) => {
    const { score, stressLevel, note } = req.body;

    try {
        const mood = await Mood.create({
            user: req.user.id,
            score,
            stressLevel,
            note,
        });
        res.status(201).json(mood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getMoods,
    logMood,
};
