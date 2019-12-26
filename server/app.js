const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { router } = require('./router');


const app = express();

// call middleware functions
app.use(bodyParser.json());
app.use(cors());

// serve static assets
const CLIENT_PATH = path.resolve(__dirname, '../public');

// api routers from router.js
app.use('/api', router);

// serve react app
app.use(express.static(CLIENT_PATH));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


module.exports.app = app;
