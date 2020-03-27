const mongoose = require('../../config/db');

const pointsSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  series: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Series',
  },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Season',
  },
  drivers: [{
    name: String,
    starts: Number,
    prov: Number,
    races_counted: Number,
    wins: Number,
    top_five: Number,
    top_ten: Number,
    laps: Number,
    laps_lead: Number,
    inc: Number,
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
