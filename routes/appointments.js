const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const query = `
    SELECT a.appointment_id, p.name AS patient, d.name AS doctor,
    a.appointment_date, a.status
    FROM appointments a
    JOIN patients p ON a.patient_id = p.patient_id
    JOIN doctors d ON a.doctor_id = d.doctor_id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/add', (req, res) => {
  const { patient_id, doctor_id, appointment_date } = req.body;
  db.query(
    'INSERT INTO appointments (patient_id, doctor_id, appointment_date) VALUES (?,?,?)',
    [patient_id, doctor_id, appointment_date],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: '✅ Appointment booked!', id: result.insertId });
    }
  );
});

module.exports = router;