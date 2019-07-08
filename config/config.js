require('dotenv').config();
const fetchEnv = require('./checkEnv');


const config = {
  port: fetchEnv('PORT'),
};

module.exports = config;
