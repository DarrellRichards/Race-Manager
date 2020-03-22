const mongoose = require('../../config/db');

const seasonSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  series: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Series',
  },
  name: String,
});

module.exports = mongoose.model('Seasons', seasonSchema);
