const { Router } = require('express');
const SeriesController = require('./series.controller');
const auth = require('../middlewares/auth');

const router = Router();

router.get('/', auth, async (req, res) => SeriesController.fetchSeries(req, res));
router.post('/', auth, async (req, res) => SeriesController.createSeries(req, res));
router.delete('/:id', auth, async (req, res) => SeriesController.deleteSeries(req, res));

module.exports = router;
