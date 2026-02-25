const mongoose = require('mongoose');

const moodSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        score: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        stressLevel: {
            type: String,
            required: true,
            enum: ['Low', 'Medium', 'High'],
        },
        note: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Mood', moodSchema);
