const express = require('express');
const { getPatients, createPatient } = require('../controllers/patientsController');
const router = express.Router();

router.get('/', getPatients);
router.post('/', createPatient);

module.exports = router;