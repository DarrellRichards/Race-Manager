require('dotenv').config();
const fetchEnv = require('./checkEnv');


const config = {
  port: fetchEnv('PORT'),
  mongoConnection: fetchEnv('MongoConnection'),
  JWT_KEY: fetchEnv('JWT_KEY'),
};

module.exports = config;
