const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Vitals = require('../models/Vitals');
const PatientProviderLink = require('../models/PatientProviderLink');

// @desc    Get all patients (for now, just list all users with role 'patient')
// @route   GET /provider/patients
// @access  Private/Provider
const getPatients = asyncHandler(async (req, res) => {
    // Check if user is provider
    if (req.user.role !== 'provider') {
        res.status(403);
        throw new Error('Not authorized as provider');
    }

    // In a real app, we would check PatientProviderLink.
    // For this MVP, we'll list all patients.
    const patients = await User.find({ role: 'patient' }).select('-password');
    res.status(200).json(patients);
});

// @desc    Get patient vitals
// @route   GET /provider/patients/:id/vitals
// @access  Private/Provider
const getPatientVitals = asyncHandler(async (req, res) => {
    // Check if user is provider
    if (req.user.role !== 'provider') {
        res.status(403);
        throw new Error('Not authorized as provider');
    }

    const vitals = await Vitals.find({ user: req.params.id }).sort({ date: -1 });
    res.status(200).json(vitals);
});

module.exports = {
    getPatients,
    getPatientVitals,
};
