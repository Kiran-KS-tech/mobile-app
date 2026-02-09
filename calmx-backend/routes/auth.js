const express = require('express');
const router = express.Router();

// Mock auth for now
router.post('/login', (req, res) => {
    res.json({ message: 'Login pseudo-endpoint', status: 'success' });
});

module.exports = router;
