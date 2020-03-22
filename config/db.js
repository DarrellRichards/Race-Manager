const mongoose = require('mongoose');
const { mongoConnection } = require('./config');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const mongoOptions = { keepAlive: 1, useNewUrlParser: true, autoIndex: true };

mongoose.connect(mongoConnection, mongoOptions);

mongoose.connection.on('error', () => { throw new Error(`unable to connect to database: ${mongoConnection}`); });

module.exports = mongoose;
