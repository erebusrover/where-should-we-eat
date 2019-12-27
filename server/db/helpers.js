// database connection and helper functions
const mysql = require('mysql');
const util = require('util');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
// Just like `connection.query`, but returns a promise!
const query = util.promisify(connection.query).bind(connection);

// add new user to db
const addNewUser = (newUser) => {
  const { userName, userStatus } = newUser;
  const sql = `INSERT into user (userName, userStatus) VALUES ("${userName}", "${userStatus}")`;
  return query(sql);
};

// TODO: add dietary restrictions to dietaryRestrictions table
// once user has selected dietary restrictions within their preferences
// NOTE: looks like table only allows for one restriction at this point
const addUserDietaryRestrictions = (user) => {
  const { userName, dietaryRestriction } = user;
};


// TODO: add new group to db
const addNewGroup = (newGroup) => {

};

// TODO: obtain user info from db

// TODO: obtain group info from db

// TODO: toggle group's active state between true and false
// (when a decision has been initiated or closed)
const toggleGroupStatus = (group) => {
  const { id, status } = group;
  const sql = `UPDATE groupp SET active="${status}" WHERE id=${id}`;
  return query(sql);
};

module.exports.addNewUser = addNewUser;
module.exports.toggleGroupStatus = toggleGroupStatus;
