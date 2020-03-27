const { Router } = require('express');
const multer = require('multer');

const upload = multer({ dest: 'tmp/csv2/' });
const ResultController = require('./results.controller');
const auth = require('../middlewares/auth');

const router = Router();

router.post('/upload', upload.single('result'), auth, async (req, res) => ResultController.processResults(req, res));
router.get('/', auth, async (req, res) => ResultController.fetchResults(req, res));
router.get('/:id', auth, async (req, res) => ResultController.fetchResultsById(req, res));

module.exports = router;
