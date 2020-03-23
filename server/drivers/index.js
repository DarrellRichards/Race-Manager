const { Router } = require('express');
const DriverController = require('./drivers.controller');
const DriverModal = require('./drivers.modal');
const auth = require('../middlewares/auth');

const router = Router();

router.route('/')
  .get(auth, async (req, res) => {
    const drivers = await DriverModal.find().populate('leagues.league');
    return res.status(200)
      .json({ status: 200, drivers });
  });

router.get('/me', async (req, res) => DriverController.getDriver(req, res));

router.post('/login', async (req, res) => DriverController.loginDriver(req, res));
router.post('/register', async (req, res) => DriverController.registerDriver(req, res));

module.exports = router;
