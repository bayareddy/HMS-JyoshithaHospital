const express = require('express');
const { getAppointments, createAppointment } = require('../controllers/appointmentsController');
const router = express.Router();

router.get('/', getAppointments);
router.post('/', createAppointment);

module.exports = router;