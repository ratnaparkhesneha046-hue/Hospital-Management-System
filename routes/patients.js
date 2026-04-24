const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all patients
router.get('/', (req, res) => {
  db.query('SELECT * FROM patients', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add new patient
router.post('/add', (req, res) => {
  const { name, age, gender, phone, address } = req.body;
  db.query(
    'INSERT INTO patients (name, age, gender, phone, address) VALUES (?,?,?,?,?)',
    [name, age, gender, phone, address],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: '✅ Patient added!', id: result.insertId });
    }
  );
});

// Delete patient
router.delete('/delete/:id', (req, res) => {
  db.query('DELETE FROM patients WHERE patient_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '✅ Patient deleted!' });
  });
});

module.exports = router;