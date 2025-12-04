const mongoose = require('mongoose');

const patientProviderLinkSchema = new mongoose.Schema({
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('PatientProviderLink', patientProviderLinkSchema);
