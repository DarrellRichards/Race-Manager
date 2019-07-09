require('dotenv').config();
const fetchEnv = require('./checkEnv');


const config = {
  port: fetchEnv('PORT'),
  mongoConnection: fetchEnv('MongoConnection'),
};

module.exports = config;
