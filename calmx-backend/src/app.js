const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const moodRoutes = require('./routes/moodRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const summaryRoutes = require('./routes/summaryRoutes');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/summary', summaryRoutes);



// Health check
app.get('/health', (req, res) => {
    res.json({ message: 'CalmX API is healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

module.exports = app;
