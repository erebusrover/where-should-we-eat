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
const CLIENT_PATH = path.resolve(__dirname, '../build');

app.use(express.static(CLIENT_PATH));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.use('/api', router);

module.exports.app = app;
