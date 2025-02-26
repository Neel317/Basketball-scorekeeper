const mongoose = require('mongoose');
const players = require('players');
const teams = require('./teams');

// Errors
const error = require('../errors/index');

const matcheSchema = mongoose.Schema({
    home: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teams',
        required: true
    },
    away: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teams',
        required: true
    },
    homeScore: {
        type: Number,
        default: 0
    },
    awayScore: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teams'
    },
    homeFouls: {
        type: Number,
        default: 0
    },
    awayFouls: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Matches', matcheSchema);