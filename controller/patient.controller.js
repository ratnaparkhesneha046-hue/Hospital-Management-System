
const Patient = require('../models/patient.js');

exports.addPatient = (req, res) => {
  Patient.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Patient added successfully" });
  });
};

exports.getPatients = (req, res) => {
  Patient.getAll((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};