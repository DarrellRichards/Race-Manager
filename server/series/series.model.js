const mongoose = require('../../config/db');

const seriesSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  season: String,
  cars: [],
  provisionals: {
    type: String,
    default: 0,
  },
  team_cars: {
    type: String,
    default: 0,
  },
  playoff_points: {
    type: Array,
    default: [15, 10, 8, 7, 6, 5, 4, 3, 2, 1],
  },
  driver_points: {
    type: Array,
    default: [40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  },
  manufacturer_points: {
    type: Array,
    default: [40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  },
  rookie_points: {
    type: Array,
    default: [40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  },
  driver_lap_lead: {
    type: Number,
    default: 0,
  },
  driver_most_laps: {
    type: Number,
    default: 0,
  },
  driver_race_winning: {
    type: Number,
    default: 0,
  },
  driver_pole_points: {
    type: Number,
    default: 0,
  },
  driver_provisional_points: {
    type: Number,
    default: 0,
  },
  rookie_lap_lead: {
    type: Number,
    default: 0,
  },
  rookie_most_laps: {
    type: Number,
    default: 0,
  },
  rookie_race_winning: {
    type: Number,
    default: 0,
  },
  rookie_pole_points: {
    type: Number,
    default: 0,
  },
  rookie_provisional_points: {
    type: Number,
    default: 0,
  },
  manufacturer_lap_lead: {
    type: Number,
    default: 0,
  },
  manufacturer_most_laps: {
    type: Number,
    default: 0,
  },
  manufacturer_race_winning: {
    type: Number,
    default: 0,
  },
  manufacturer_pole_points: {
    type: Number,
    default: 0,
  },
  manufacturer_provisional_points: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Series', seriesSchema);
