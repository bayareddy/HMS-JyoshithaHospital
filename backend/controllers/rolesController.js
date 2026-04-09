const db = require('../config/db');

// Get all roles
const getRoles = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM roles');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new role
const createRole = async (req, res) => {
  const { id, name, description, isActive } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO roles (id, name, description, is_active) VALUES (?, ?, ?, ?)',
      [id, name, description, isActive !== false]
    );
    res.status(201).json({ id, name, description, isActive: isActive !== false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getRoles, createRole };