const Mood = require('../models/Mood');

// @desc    Get holistic burnout and stress summary
// @route   GET /api/summary
// @access  Private
const getUserSummary = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Get recent mood scores
        const recentMoods = await Mood.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(10);

        const avgMoodScore = recentMoods.length > 0
            ? recentMoods.reduce((acc, curr) => acc + curr.score, 0) / recentMoods.length
            : 0;

        // 2. Identify stress trends
        const stressCounts = { High: 0, Medium: 0, Low: 0 };
        recentMoods.forEach(m => stressCounts[m.stressLevel]++);

        // 3. Simple Burnout Logic
        let alert = "Your wellness levels are stable.";
        if (stressCounts.High >= 3) {
            alert = "High Alert: Sustained high stress detected over several days. Please consider a rest day.";
        } else if (stressCounts.Medium >= 5) {
            alert = "Warning: Persistent moderate stress levels. Your work-life balance may need adjustment.";
        }

        res.json({
            avgMoodScore,
            stressTrends: stressCounts,
            burnoutAlert: alert,
            lastLogged: recentMoods[0] ? recentMoods[0].createdAt : null,
            recommendation: avgMoodScore < 40 ? "Take a 15-minute walk outside." : "Keep up the great work!"
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating summary', error: error.message });
    }
};

module.exports = {
    getUserSummary,
};
