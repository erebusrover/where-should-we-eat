const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { router } = require('./router');

// call express
const app = express();

// call middleware functions
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

// serve static assets
const CLIENT_PATH = path.resolve(__dirname, 'build');
app.use(express.static(CLIENT_PATH));
// send users to main index page on all endpoints
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// api routers from router.js
module.exports.app = app;
