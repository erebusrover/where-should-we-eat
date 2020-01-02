const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const { router } = require('./router');
require('./config/passport-setup');


// call express
const app = express();

// call middleware functions
app.use(passport.initialize());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.options('*', cors());
app.use('/api', router);


// serve static assets
const CLIENT_PATH = path.resolve(__dirname, '../build');
app.use(express.static(CLIENT_PATH));
// send users to main index page on all endpoints
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

// api routers from router.js
module.exports.app = app;
