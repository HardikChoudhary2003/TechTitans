const mongoose = require('mongoose');

const vitalsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    type: {
        type: String,
        required: [true, 'Please add vital type'],
        enum: ['heart_rate', 'blood_pressure', 'weight', 'blood_sugar', 'temperature', 'respiratory_rate', 'oxygen_saturation'],
    },
    value: {
        type: String,
        required: [true, 'Please add vital value'],
    },
    unit: {
        type: String,
        required: [true, 'Please add unit'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Vitals', vitalsSchema);
