const { Router } = require('express');
const ScheduleController = require('./schedule.controller');
const auth = require('../middlewares/auth');

const router = Router();

router.get('/', auth, async (req, res) => ScheduleController.fetchSchedule(req, res));
router.post('/', auth, async (req, res) => ScheduleController.createSchedule(req, res));
router.get('/:id', auth, async (req, res) => ScheduleController.fetchScheduleById(req, res));
router.delete('/:id', auth, async (req, res) => ScheduleController.deleteSchedule(req, res));

module.exports = router;
