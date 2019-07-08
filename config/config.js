require('dotenv').config();
const checkEnv = require('./checkEnv');


const config = {
  port: checkEnv.fetchEnv('PORT'),
};
  
module.exports = config;