const mongoose = require('mongoose');
const Players = require('../models/players');
const Teams = require('../models/teams');
const Matches = require('../models/matches');
const error = require('../errors/index');

// Add points to a team
const updatePoints = async (req, res, teamType, points) => {
  const { matchId, playerId } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
      const match = await Matches.findById(matchId).session(session);
      if (!match) {
          throw new error.CustomAPIError('Match not found', 404);
      }

      const player = await Players.findById(playerId).session(session);
      if (!player) {
          throw new error.CustomAPIError('Player not found', 404);
      }
      player.addPoints(points);
      await player.save({ session });

      const team = await Teams.findById(match[teamType]).session(session);
      if (!team) {
          throw new error.CustomAPIError('Team not found', 404);
      }
      team.addPoints(points);
      await team.save({ session });

      match[`${teamType}Score`] += points;
      await match.save({ session });

      await session.commitTransaction();
      res.status(200).json({ msg: "Points updated successfully" });
  } catch (err) {
      await session.abortTransaction();
      throw new error.CustomAPIError(err.message, 500);
  } finally {
      session.endSession();
  }
}

module.exports.addPointsHome = (req, res) => {
  updatePoints(req, res, 'home', req.body.points);
}

module.exports.addPointsAway = (req, res) => {
  updatePoints(req, res, 'away', req.body.points);
}