require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// CORS Issues
// allow cross origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT,OPTIONS, DELETE, GET');
  if (req.method === 'OPTIONS') {
    const headers = {};
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Credentials'] = false;
    headers['Access-Control-Max-Age'] = '86400';
    headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization';
    res.writeHead(200, headers);
    res.end();
  } else {
    res.header('Access-Control-Allow-Methods', 'POST, PUT,OPTIONS, DELETE, GET');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin');
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
});

// Body Parser Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
