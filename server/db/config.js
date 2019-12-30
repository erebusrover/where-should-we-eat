const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config();
// ^^^ injects the dotenv package into our project configuration
// process.env now has the keys and values defined in .env

module.exports = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wswe',
};
