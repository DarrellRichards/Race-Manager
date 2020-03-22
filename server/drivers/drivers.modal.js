const jwt = require('jsonwebtoken');
const mongoose = require('../../config/db');

const driverSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  driverName: String,
  email: String,
  password: String,
  leagues: [{
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Leagues',
    },
    admin: {
      type: Boolean,
      default: false,
    },
  }],
  seasons: [{
    season: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seasons',
    },
    points: {
      type: Number,
      default: 0,
    },
    bonus_points: {
      type: Number,
      default: 0,
    },
    pen_points: {
      type: Number,
      default: 0,
    },
    total_points: {
      type: Number,
      default: 0,
    },
    starts: {
      type: Number,
      default: 0,
    },
    wins: {
      type: Number,
      default: 0,
    },
    top_five: {
      type: Number,
      default: 0,
    },
    top_ten: {
      type: Number,
      default: 0,
    },
    laps_completed: {
      type: Number,
      default: 0,
    },
    laps_led: {
      type: Number,
      default: 0,
    },
  }],
});

driverSchema.methods.generateAuthToken = async (driver) => {
  // Generate an auth token for the user
  const token = jwt.sign({ _id: driver._id }, process.env.JWT_KEY);
  return token;
};

module.exports = mongoose.model('Driver', driverSchema);
