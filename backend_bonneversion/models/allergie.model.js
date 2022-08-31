const mongoose = require('mongoose');

const allergieSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            required: true,
        },
        posterId: {
            type: String,
            required: true,
        },
        allergie_name: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        clinicSign: {
            type: [String],
        },
        symptom : {
            type: [String],
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('allergie', allergieSchema);