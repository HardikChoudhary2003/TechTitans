const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    targetDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'abandoned'],
        default: 'active',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Goal', goalSchema);
