const mongoose = require('mongoose');

const providerNotesSchema = new mongoose.Schema({
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
    note: {
        type: String,
        required: [true, 'Please add a note'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('ProviderNotes', providerNotesSchema);
