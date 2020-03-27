const mongoose = require('../../config/db');

const scheduleSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  img: String,
  track: String,
  date: Date,
  race_length: String,
  series: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Series',
  },
  results: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Results',
  }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
