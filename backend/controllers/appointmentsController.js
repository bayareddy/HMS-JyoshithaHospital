const db = require('../config/db');

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM appointments');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new appointment
const createAppointment = async (req, res) => {
  const { id, appointment_time, patient_id, doctor_id, type, department_id, status } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO appointments (id, appointment_time, patient_id, doctor_id, type, department_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, appointment_time, patient_id, doctor_id, type, department_id, status]
    );
    res.status(201).json({ message: 'Appointment created', appointmentId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAppointments, createAppointment };