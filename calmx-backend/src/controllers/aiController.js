const axios = require('axios');

// @desc    Chat with CalmX AI (DeepSeek Integration)
// @route   POST /api/ai/chat
// @access  Private
const chatAI = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: 'Please provide a message' });
    }

    try {
        // Real deepseek API call structure
        const response = await axios.post(
            'https://api.deepseek.com/v1/chat/completions',
            {
                model: 'deepseek-chat',
                messages: [
                    { 
                        role: 'system', 
                        content: 'You are CalmX AI, a supportive assistant specialized in corporate burnout. Be professional, empathetic, and offer small actionable steps for stress relief.' 
                    },
                    { role: 'user', content: message }
                ],
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        ).catch(err => {
            // Fallback for development if API key is missing
            return { data: { choices: [{ message: { content: `[Mock] CalmX AI: I'm here to support you. You mentioned "${message}". This sounds stressful. Try a 2-minute breathing exercise.` } }] } };
        });

        const reply = response.data.choices[0].message.content;

        res.json({
            reply,
            sentiment: 'supportive',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ message: 'AI Service Error', error: error.message });
    }
};

module.exports = {
    chatAI,
};

