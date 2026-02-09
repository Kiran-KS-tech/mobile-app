const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const calendarRoutes = require('./routes/calendar');

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/calendar', calendarRoutes);

app.get('/', (req, res) => {
  res.send('CalmX API is running...');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
