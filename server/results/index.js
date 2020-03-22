const { Router } = require('express');
const multer = require('multer');

const upload = multer({ dest: 'tmp/csv/' });
const ResultController = require('./results.controller');
const auth = require('../middlewares/auth');

const router = Router();

router.post('/upload', upload.single('file'), auth, async (req, res) => ResultController.processResults(req, res));
router.get('/', auth, async (req, res) => ResultController.fetchResults(req, res));

module.exports = router;
