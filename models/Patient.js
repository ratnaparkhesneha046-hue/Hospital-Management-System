const db = require('../config/db');

const Patient = {
  create: (data, callback) => {
    const sql = "INSERT INTO patients (name, age, gender, disease) VALUES (?, ?, ?, ?)";
    db.query(sql, [data.name, data.age, data.gender, data.disease], callback);
  },

  getAll: (callback) => {
    db.query("SELECT * FROM patients", callback);
  }
};

module.exports = Patient;