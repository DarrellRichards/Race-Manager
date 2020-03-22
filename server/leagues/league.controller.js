const LeagueModel = require('./league.model');
const DriverModel = require('../drivers/drivers.modal');

class LeagueController {
  constructor() {
    this.model = LeagueModel;
    this.driver = DriverModel;
  }

  async createLeague(req, res) {
    const { driver, name } = req.body;
    try {
      const league = await this.model.create({ name });
      await this.driver.findByIdAndUpdate(driver, { $push: { leagues: { league, admin: true } } },
        { new: true, upsert: true });
      return res.status(200).json({ league });
    } catch (e) {
      return res.status(403).json({ error: 'Name of league already exists, try another name.' });
    }
  }
}

module.exports = new LeagueController();
