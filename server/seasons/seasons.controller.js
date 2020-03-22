const SeasonModel = require('./seasons.model');

class SeasonController {
  constructor() {
    this.model = SeasonModel;
  }

  async createSeason(req, res) {
    const season = await this.model.create(req.body);
    return res.status(201).json({ season });
  }

  async getSeason(req, res) {
    const seasons = await this.model.find().populate('series');
    return res.status(201).json({ seasons });
  }
}

module.exports = new SeasonController();
