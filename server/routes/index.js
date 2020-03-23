// eslint-disable-next-line prefer-destructuring
const { Router } = require('express');
const DriverRoutes = require('../drivers');
// const AuthRoutes = require('../auth');
const ResultRoutes = require('../results');
const SeriesRoutes = require('../series');
const ScheduleRoutes = require('../schedules');
const SeasonRoutes = require('../seasons');
const LeagueRoutes = require('../leagues');
// const PointsRoutes = require('../points');

const router = Router();

router.route('/health-check')
  .get((req, res) => {
    res.status(200)
      .json({ status: 200, message: 'Server is connected' });
  });

router.use('/drivers', DriverRoutes);
router.use('/results', ResultRoutes);
router.use('/series', SeriesRoutes);
router.use('/schedule', ScheduleRoutes);
router.use('/seasons', SeasonRoutes);
router.use('/leagues', LeagueRoutes);
// router.use('/points', PointsRoutes);
// router.use('/', AuthRoutes);

module.exports = router;
