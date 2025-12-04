const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    relationship: {
        type: String,
        required: [true, 'Please add relationship'],
    },
    phone: {
        type: String,
        required: [true, 'Please add phone number'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);
