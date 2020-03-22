const jwt = require('jsonwebtoken');
const Driver = require('../drivers/drivers.modal');

const auth = async (req, res, next) => {
  if (!req.header('Authorization')) return res.status(403).json({ error: 'Must pass back a Authorization header' });
  const token = req.header('Authorization').replace('Bearer ', '');
  const data = jwt.verify(token, process.env.JWT_KEY);
  try {
    const driver = await Driver.findOne({ _id: data._id });
    if (!driver) return res.status(403).json({ error: 'Incorrect Permissions to access' });
    req.driver = driver;
    next();
  } catch (e) {
    return res.status(403).json({ error: 'Incorrect Permissions to access' });
  }
};


module.exports = auth;
