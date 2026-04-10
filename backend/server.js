const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const tenantsRoutes = require('./routes/tenants');
const departmentsRoutes = require('./routes/departments');
const staffRoutes = require('./routes/staff');
const patientsRoutes = require('./routes/patients');
const appointmentsRoutes = require('./routes/appointments');
const qualificationsRoutes = require('./routes/qualifications');
const rolesRoutes = require('./routes/roles');
const availabilitiesRoutes = require('./routes/availabilities');
const shiftsRoutes = require('./routes/shifts');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/tenants', tenantsRoutes);
app.use('/api/departments', departmentsRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/qualifications', qualificationsRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/availabilities', availabilitiesRoutes);
app.use('/api/shifts', shiftsRoutes);

// Serve static files from the frontend build (if available)
app.use(express.static(path.join(__dirname, '../dist')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../dist/index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(500).send('Error loading application');
    }
  });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});