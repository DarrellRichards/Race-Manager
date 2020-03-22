const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DriverModel = require('../drivers/drivers.modal');

class DriverController {
  constructor() {
    this.model = DriverModel;
  }

  // eslint-disable-next-line class-methods-use-this
  async loginDriver(req, res) {
    const { username, password } = req.body;
    const driver = await this.model.findOne({ driverName: username });
    if (!driver) return res.status(200).json({ message: 'Username or Password was not correct.' });
    const isPasswordMatch = await bcrypt.compare(password, driver.password);
    if (!isPasswordMatch) return res.status(200).json({ message: 'Username or Password was not correct.' });
    const token = await driver.generateAuthToken(driver);
    return res.status(200)
      .json({ status: 200, token });
  }

  async getDriver(req, res) {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const driver = await this.model.findOne({ _id: decoded._id }).populate('leagues.league');

    return res.status(200).json({ driver });
  }

  async addDriverToSeason(req, res) {

  }

  async addDriverToLeague(req, res) {

  }
}


module.exports = new DriverController();
