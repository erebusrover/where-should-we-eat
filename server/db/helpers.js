// database connection and helper functions
const mysql = require('mysql');
const util = require('util');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
// Just like `connection.query`, but returns a promise!
const query = util.promisify(connection.query).bind(connection);

// TODO: add new user to db
const addNewUser = (newUser) => {
  const { userName, userStatus } = newUser;
  const sql = `INSERT into user (userName, userStatus) VALUES ("${userName}", "${userStatus}")`;
  return query(sql);
};

// TODO: add new group to db

// TODO: obtain user info from db

// TODO: obtain group info from db

module.exports.addNewUser = addNewUser;
