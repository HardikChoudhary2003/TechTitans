const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Vitals = require('../models/Vitals');
const Goal = require('../models/Goal');
const Reminder = require('../models/Reminder');
const EmergencyContact = require('../models/EmergencyContact');

// @desc    Get patient profile
// @route   GET /patient/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
});

// @desc    Update patient profile
// @route   PUT /patient/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json(user);
});

// @desc    Add vital
// @route   POST /patient/vitals
// @access  Private
const addVital = asyncHandler(async (req, res) => {
    const { type, value, unit, date } = req.body;

    if (!type || !value || !unit) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const vital = await Vitals.create({
        user: req.user.id,
        type,
        value,
        unit,
        date,
    });

    res.status(201).json(vital);
});

// @desc    Get vitals history
// @route   GET /patient/vitals/history
// @access  Private
const getVitalsHistory = asyncHandler(async (req, res) => {
    const vitals = await Vitals.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(vitals);
});

// @desc    Add goal
// @route   POST /patient/goals
// @access  Private
const addGoal = asyncHandler(async (req, res) => {
    if (!req.body.description) {
        res.status(400);
        throw new Error('Please add a description');
    }

    const goal = await Goal.create({
        user: req.user.id,
        description: req.body.description,
        targetDate: req.body.targetDate,
    });

    res.status(201).json(goal);
});

// @desc    Get goals
// @route   GET /patient/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
});

// @desc    Add reminder
// @route   POST /patient/reminders
// @access  Private
const addReminder = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.datetime) {
        res.status(400);
        throw new Error('Please add title and datetime');
    }

    const reminder = await Reminder.create({
        user: req.user.id,
        title: req.body.title,
        datetime: req.body.datetime,
    });

    res.status(201).json(reminder);
});

// @desc    Get reminders
// @route   GET /patient/reminders
// @access  Private
const getReminders = asyncHandler(async (req, res) => {
    const reminders = await Reminder.find({ user: req.user.id });
    res.status(200).json(reminders);
});

// @desc    Add emergency contact
// @route   POST /patient/emergency-contact
// @access  Private
const addEmergencyContact = asyncHandler(async (req, res) => {
    const { name, relationship, phone } = req.body;

    if (!name || !relationship || !phone) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const contact = await EmergencyContact.create({
        user: req.user.id,
        name,
        relationship,
        phone,
    });

    res.status(201).json(contact);
});

// @desc    Get emergency contact
// @route   GET /patient/emergency-contact
// @access  Private
const getEmergencyContact = asyncHandler(async (req, res) => {
    const contacts = await EmergencyContact.find({ user: req.user.id });
    res.status(200).json(contacts);
});

const getDashboardStats = asyncHandler(async (req, res) => {
    // Get latest vitals
    const latestVitals = await Vitals.aggregate([
        { $match: { user: req.user._id } },
        { $sort: { date: -1 } },
        {
            $group: {
                _id: '$type',
                value: { $first: '$value' },
                unit: { $first: '$unit' },
                date: { $first: '$date' }
            }
        }
    ]);

    // Transform vitals array to object
    const vitalsMap = {};
    latestVitals.forEach(v => {
        vitalsMap[v._id] = v.value;
    });

    // Get active goals
    const goals = await Goal.find({ user: req.user._id });

    res.json({
        steps: vitalsMap['steps'] || 0,
        sleep: vitalsMap['sleep'] || 0,
        heartRate: vitalsMap['heart_rate'] || 0,
        water: vitalsMap['water'] || 0,
        goals: goals
    });
});

module.exports = {
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
};
