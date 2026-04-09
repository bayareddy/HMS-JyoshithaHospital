const db = require('../config/db');

// Get all patients
const getPatients = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM patients');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new patient
const createPatient = async (req, res) => {
  const { id, name, age, gender, ward, doctor, diagnosis, blood, status, date, phone } = req.body;
  try {
    const timestamp = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const [result] = await db.query(
      'INSERT INTO patients (id, name, age, gender, ward, doctor_id, diagnosis, blood_group, status, admission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, age || 'N/A', gender || '—', ward || '—', doctor || '—', diagnosis || '—', blood || '—', status || 'admitted', new Date()]
    );
    res.status(201).json({ id, name, age: age || 'N/A', gender: gender || '—', ward: ward || '—', doctor: doctor || '—', diagnosis: diagnosis || '—', blood: blood || '—', status: status || 'admitted', date: timestamp });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPatients, createPatient };