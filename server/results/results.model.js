const mongoose = require('../../config/db');

const resultsSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  start_time: String,
  track: String,
  series: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Series',
  },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
  },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seasons',
  },
  drivers: [{
    finish_pos: Number,
    start_pos: Number,
    name: String,
    int: String,
    qual_time: String,
    fast_lap_time: String,
    laps_comp: String,
    car_number: Number,
    laps_led: Number,
    avg_lap_time: String,
    fast_lap: Number,
    inc: Number,
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
  }],
});

module.exports = mongoose.model('Results', resultsSchema);
