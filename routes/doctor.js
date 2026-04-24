const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM doctors', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/add', (req, res) => {
  const { name, specialization, phone, email } = req.body;
  db.query(
    'INSERT INTO doctors (name, specialization, phone, email) VALUES (?,?,?,?)',
    [name, specialization, phone, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: '✅ Doctor added!', id: result.insertId });
    }
  );
});

module.exports = router;