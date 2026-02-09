const express = require('express');
const router = express.Router();

router.get('/events', (req, res) => {
    res.json({ events: [], message: 'Calendar events endpoint' });
});

module.exports = router;
