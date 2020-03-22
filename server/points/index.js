const { Router } = require('express');
const PointsController = require('./points.controller');
const auth = require('../middlewares/auth');

const router = Router();


router.get('/', auth, async (req, res) => PointsController.obtainSeriesPoints(req, res));

module.exports = router;
