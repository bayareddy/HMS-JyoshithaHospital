const express = require('express');
const { getTenants, createTenant } = require('../controllers/tenantsController');
const router = express.Router();

router.get('/', getTenants);
router.post('/', createTenant);

module.exports = router;