const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const query = `
    SELECT b.bill_id, p.name AS patient, b.amount, 
    b.payment_status, b.bill_date
    FROM billing b
    JOIN patients p ON b.patient_id = p.patient_id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/add', (req, res) => {
  const { patient_id, amount, bill_date } = req.body;
  db.query(
    'INSERT INTO billing (patient_id, amount, bill_date) VALUES (?,?,?)',
    [patient_id, amount, bill_date],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: '✅ Bill created!', id: result.insertId });
    }
  );
});

module.exports = router;