// database connection and helper functions
const mysql = require('mysql');
const util = require('util');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
// Just like `connection.query`, but returns a promise!
const query = util.promisify(connection.query).bind(connection);

// TODO: work on sql injection issue

// add new user to db
// newUser arg should look something like:
// {
//   userName,
//   userStatus
// }
const addNewUser = (newUser) => {
  const { userName, userStatus } = newUser;
  const sql = `INSERT into user (userName, userStatus) VALUES (?, ?)
                ON DUPLICATE KEY UPDATE userStatus = ?`;
  return query(sql, [userName, userStatus, userStatus]);
};

// add dietary restrictions to dietaryRestrictions table
// once user has selected dietary restrictions within their preferences
const addUserDietaryRestrictions = (user) => {
  // dietaryRestrictions should be an array
  const { userName, dietaryRestrictions } = user;
  // for each dietary restriction, add it to table with id of user
  dietaryRestrictions.map((dietaryRestriction) => {
    const sql = `INSERT into dietaryRestrictions (restriction, userid) 
                  VALUES (?, (SELECT userid FROM user WHERE userName = ?))`;
    return query(sql, [dietaryRestriction, userName]);
  });
};

// TODO: delete dietary restriction for a user
const deleteUserDietaryRestriction = (user) => {
  const { userName, restriction } = user;
  const sql = `DELETE FROM dietaryRestrictions WHERE restriction = ? 
                & userid = (SELECT userid FROM user WHERE userName = ?)`;
  return query(sql, [restriction, userName]);
};

// add new group to db
// newGroup arg should look something like:
// {
//   groupName,
//   choice,?
//   pricePoint,
// }
const addNewGroup = (newGroup) => {
  const { groupName, pricePoint } = newGroup;
  const sql = `INSERT into groupp (groupName, active, pricePoint) VALUES(?, true, ?)
                ON DUPLICATE KEY UPDATE userStatus = ?`;
  return query(sql, [groupName, pricePoint, pricePoint]);
};


// TODO: toggle group's active state between true and false
// (when a decision has been initiated or closed)
const toggleGroupStatus = (group) => {
  const { id, status } = group;
  const sql = 'UPDATE groupp SET active=? WHERE id=?';
  return query(sql, [status, id]);
};

// add chosen location to grouphistory table
// TODO: figure out how location is being stored. Are we assigning them ids?
const addToGroupHistory = (group) => {
  const { groupName, chosenLocation } = group;
  const sql = `INSERT into grouphistory (groupid, location_id) VALUES 
    ((SELECT groupid from groupp WHERE groupName = ?), ?)`;
  return query(sql, [groupName, chosenLocation]);
};

// TODO: add user image/avatar to userImages table

// TODO: obtain user info from db

// TODO: obtain group info from db

module.exports.addNewUser = addNewUser;
module.exports.addNewGroup = addNewGroup;
module.exports.addUserDietaryRestrictions = addUserDietaryRestrictions;
module.exports.deleteUserDietaryRestriction = deleteUserDietaryRestriction;
module.exports.addToGroupHistory = addToGroupHistory;
module.exports.toggleGroupStatus = toggleGroupStatus;
