const mongoose = require('../../config/db');

const pointsSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  series: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Series',
  },
  drivers: [{
    postion: Number,
    change: Number,
    name: String,
    starts: Number,
    wins: Number,
    top_five: Number,
    top_ten: Number,
    laps: Number,
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

module.exports = mongoose.model('Points', pointsSchema);
