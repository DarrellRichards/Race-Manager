const mongoose = require('../../config/db');

const leagueSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model('Leagues', leagueSchema);
