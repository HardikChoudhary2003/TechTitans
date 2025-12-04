const express = require('express');
const router = express.Router();
const {
    getPatients,
    getPatientVitals,
    getPatientNotes,
    addPatientNote,
} = require('../controllers/providerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/patients').get(protect, getPatients);
router.route('/patients/:id/vitals').get(protect, getPatientVitals);
router
    .route('/patients/:id/notes')
    .get(protect, getPatientNotes)
    .post(protect, addPatientNote);

module.exports = router;
