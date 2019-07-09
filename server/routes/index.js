// eslint-disable-next-line prefer-destructuring
const Router = require('express').Router

const router = Router();

router.route('/health-check')
  .get((req, res) => {
    res.status(200)
      .json({ status: 200, message: 'Server is connected' });
  });

module.exports = router;
