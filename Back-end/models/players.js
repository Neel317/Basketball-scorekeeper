const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teams',
        required: true
    },
    jersey: {
        type: Number,
        required: true,
    },
    points: {
        type: Number,
        default: 0
    },
    fouls: {
        type: Number,
        default: 0
    }
})

playerSchema.methods.twoPointer = function() {
    this.points += 2;
    this.save();
}

module.exports = mongoose.model('Players', playerSchema);