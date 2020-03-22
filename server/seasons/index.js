const { Router } = require('express');
const SeasonController = require('./seasons.controller');
const auth = require('../middlewares/auth');

const router = Router();

router.post('/', auth, async (req, res) => SeasonController.createSeason(req, res));
router.get('/', auth, async (req, res) => SeasonController.getSeason(req, res));

module.exports = router;
