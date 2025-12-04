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
    getDashboardStats
} = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.route('/vitals').post(protect, addVital);
router.route('/vitals/history').get(protect, getVitalsHistory);
router.route('/goals').get(protect, getGoals).post(protect, addGoal);
router.route('/reminders').get(protect, getReminders).post(protect, addReminder);
router.get('/emergency-contact', protect, getEmergencyContact);
router.post('/emergency-contact', protect, addEmergencyContact);
router.get('/dashboard-stats', protect, getDashboardStats);

module.exports = router;
