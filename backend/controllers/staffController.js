const db = require('../config/db');

// Get all staff
const getStaff = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM staff');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new staff member
const createStaff = async (req, res) => {
  const { id, name, role, department, phone, status, availability, hospital, isActive } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO staff (id, name, role_id, department_id, phone, status, tenant_id, availability_id, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, role || 'Doctor', department || 'General', phone || '', status || 'admitted', hospital || 'Jyoshita Clinic Main', availability || 'Available', isActive !== false]
    );
    res.status(201).json({ id, name, role, department, phone, status, availability, hospital, isActive });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a staff member
const updateStaff = async (req, res) => {
  const { id } = req.params;
  const { name, role, department, phone, status, availability, hospital, isActive } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE staff SET name = ?, role_id = ?, department_id = ?, phone = ?, status = ?, availability_id = ?, tenant_id = ?, is_active = ? WHERE id = ?',
      [name, role || 'Doctor', department || 'General', phone || '', status, availability || 'Available', hospital || 'Jyoshita Clinic Main', isActive !== false, id]
    );
    res.json({ id, name, role, department, phone, status, availability, hospital, isActive });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getStaff, createStaff, updateStaff };