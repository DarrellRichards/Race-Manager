const { Router } = require('express');
const LeagueController = require('./league.controller');
const auth = require('../middlewares/auth');

const router = Router();

router.post('/', auth, async (req, res) => LeagueController.createLeague(req, res));
router.get('/:driver', auth, async (req, res) => LeagueController.getAllDriverLeagues(req, res));

module.exports = router;
