const bcrypt = require('bcryptjs');
const DriverModel = require('../drivers/drivers.modal');

class AuthController {
  constructor() {
    this.model = DriverModel;
  }

  async registerDriver(req, res) {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const createdDriver = await this.model.create(req.body);
    return res.status(201)
      .json({ status: 201, createdDriver });
  }
}


module.exports = new AuthController();
