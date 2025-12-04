const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Vitals = require('../models/Vitals');
const ProviderNotes = require('../models/ProviderNotes');
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

    // Fetch all users with role 'patient'
    // In a real microservices setup, this might involve an inter-service call 
    // or accessing a shared DB. Here we access the shared User collection.
    const patients = await User.find({ role: 'patient' }).select('-password');

    const patientsWithDetails = patients.map(patient => {
        let age = 'N/A';
        if (patient.dob) {
            const diff = Date.now() - new Date(patient.dob).getTime();
            const ageDate = new Date(diff);
            age = Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        return {
            _id: patient._id,
            name: patient.name,
            email: patient.email,
            risk: patient.riskLevel || 'Low',
            age: age,
            lastVisit: new Date().toLocaleDateString() // Still mock for now as we don't track visits yet
        };
    });

    res.json(patientsWithDetails);
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

// @desc    Get patient notes
// @route   GET /provider/patients/:id/notes
// @access  Private/Provider
const getPatientNotes = asyncHandler(async (req, res) => {
    // Check if user is provider
    if (req.user.role !== 'provider') {
        res.status(403);
        throw new Error('Not authorized as provider');
    }

    const notes = await ProviderNotes.find({ patient: req.params.id })
        .populate('provider', 'name')
        .sort({ date: -1 });
    res.status(200).json(notes);
});

// @desc    Add patient note
// @route   POST /provider/patients/:id/notes
// @access  Private/Provider
const addPatientNote = asyncHandler(async (req, res) => {
    // Check if user is provider
    if (req.user.role !== 'provider') {
        res.status(403);
        throw new Error('Not authorized as provider');
    }

    const { note } = req.body;

    if (!note) {
        res.status(400);
        throw new Error('Please add a note');
    }

    const newNote = await ProviderNotes.create({
        provider: req.user.id,
        patient: req.params.id,
        note,
    });

    const populatedNote = await ProviderNotes.findById(newNote._id).populate(
        'provider',
        'name'
    );

    res.status(201).json(populatedNote);
});

module.exports = {
    getPatients,
    getPatientVitals,
    getPatientNotes,
    addPatientNote,
};
