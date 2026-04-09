const db = require('../config/db');

// Get all departments
const getDepartments = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM departments');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new department
const createDepartment = async (req, res) => {
  const { id, name, head_id, description, is_active } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO departments (id, name, head_id, description, is_active) VALUES (?, ?, ?, ?, ?)',
      [id, name, head_id, description, is_active !== false]
    );
    res.status(201).json({ id, name, head_id, description, is_active: is_active !== false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDepartments, createDepartment };