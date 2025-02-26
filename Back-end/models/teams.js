const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'players'
    }],
    totalPoints: {
        type: Number,
        default: 0
    },
    totalFouls: {
        type: Number,
        default: 0
    }
})

teamSchema.methods.twoPointer = function() {
    this.totalFouls += 2;
    this.save();
}

module.exports = mongoose.model('Teams', teamSchema);