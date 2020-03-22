const { Router } = require('express');
const authController = require('./auth.controller');

const router = Router();

router.post('/register', async (req, res) => authController.registerDriver(req, res));


module.exports = router;
