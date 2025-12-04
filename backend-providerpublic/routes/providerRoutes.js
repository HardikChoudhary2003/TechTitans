const express = require('express');
const router = express.Router();
const {
    getPatients,
    getPatientVitals,
} = require('../controllers/providerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/patients').get(protect, getPatients);
router.route('/patients/:id/vitals').get(protect, getPatientVitals);

module.exports = router;
