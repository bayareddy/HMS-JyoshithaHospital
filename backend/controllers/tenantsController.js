const db = require('../config/db');

// Get all tenants
const getTenants = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tenants');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new tenant
const createTenant = async (req, res) => {
  const { id, name, location, isActive } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO tenants (id, name, location, is_active) VALUES (?, ?, ?, ?)',
      [id, name, location, isActive !== false]
    );
    res.status(201).json({ id, name, location, isActive: isActive !== false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTenants, createTenant };