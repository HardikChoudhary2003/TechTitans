const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    addVital,
    getVitalsHistory,
    addGoal,
    getGoals,
    addReminder,
    getReminders,
    addEmergencyContact,
    getEmergencyContact,
} = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.route('/vitals').post(protect, addVital);
router.route('/vitals/history').get(protect, getVitalsHistory);
router.route('/goals').get(protect, getGoals).post(protect, addGoal);
router.route('/reminders').get(protect, getReminders).post(protect, addReminder);
router.route('/emergency-contact').get(protect, getEmergencyContact).post(protect, addEmergencyContact);

module.exports = router;
