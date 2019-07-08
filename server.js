require('dotenv').config();
const http = require('http');
const debug = require('debug')('server');
const config = require('./config/config');
const app = require('./server/app');

const { port } = config;

app.set('port', port);
const server = http.createServer(app);

/* istanbul ignore next */
const onError = (error) => {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string'
    ? `pipe ${port}`
    : `port ${port}`;
  switch (error.code) {
    case 'EACCES':
      debug(`${bind} require elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`${bind} is already in use.`);
      process.exit(1);
      break;
    default: throw error;
  }
};
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Web Server listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

module.exports = server;
