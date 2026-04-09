const express = require('express');
const bodyParser = require('body-parser');
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
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});