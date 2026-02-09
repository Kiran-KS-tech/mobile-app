const express = require('express');
const router = express.Router();

router.post('/chat', (req, res) => {
    const { message } = req.body;
    // This will eventually call DeepSeek LLM
    res.json({
        reply: `CalmX AI: I'm here to help. You said: "${message}". Let's focus on your well-being.`,
        sentiment: 'neutral'
    });
});

module.exports = router;
