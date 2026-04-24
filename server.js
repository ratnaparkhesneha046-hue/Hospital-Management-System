const express = require('express');
const db = require('./db');
require('dotenv').config();

const app = express();

// 🔥 ADD THESE TWO LINES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Routes
app.use('/patients', require('./routes/patients'));
app.use('/doctors', require('./routes/doctor'));
app.use('/appointments', require('./routes/appointments'));
app.use('/billing', require('./routes/billing'));

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT}`);
});