const mongoose = require('../../config/db');

const scheduleSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  img: String,
  track: String,
  date: Date,
  series: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Series',
  },
});

module.exports = mongoose.model('Schedule', scheduleSchema);
