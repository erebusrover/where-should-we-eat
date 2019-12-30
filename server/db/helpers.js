// database connection and helper functions
const mysql = require('mysql');
const util = require('util');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
// Just like `connection.query`, but returns a promise!
const query = util.promisify(connection.query).bind(connection);

// add new user to db
const addNewUser = (userName, userStatus) => {
  const sql = `INSERT into user (userName, status) VALUES (?, ?)
                ON DUPLICATE KEY UPDATE userName = ?`;
  return query(sql, [userName, userStatus, userName]);
};

// allow user to change their username
const updateUserName = (userName, newUserName) => {
  const sql = 'UPDATE user SET userName = ? WHERE userName = ?';
  return query(sql, [newUserName, userName]);
};

// add user status
const addUserStatus = (userName, status) => {
  const sql = 'INSERT into user (status) VALUES (?) WHERE userName = ?';
  return query(sql, [status, userName]);
};

// change user status
const updateUserStatus = (userName, newStatus) => {
  const sql = 'UPDATE user SET userStatus = ? WHERE userName = ?';
  return query(sql, [newStatus, userName]);
};

const addUserImage = (userName, image) => {
  const sql = `INSERT into userImages (user_id, image)
                VALUES ((SELECT user_id FROM user WHERE userName = ?), ?)`;
  return query(sql, [userName, image]);
};

const updateUserImage = (userName, newImage) => {
  const sql = `UPDATE userImages SET image = ? 
                WHERE user_id = (SELECT user_id FROM user WHERE userName = ?)`;
  return query(sql, [newImage, userName]);
};

// BUG/TODO: currently cannot have multiple users with the same restriction
// add dietary restrictions to dietaryRestrictions table
const addUserDietaryRestrictions = (userName, restrictions) => {
  // restrictions should be an array
  // for each dietary restriction, add it to table with id of user
  return Promise.all(restrictions.map((restriction) => {
    const sql = `INSERT into dietaryRestrictions (user_id, restriction) 
                  VALUES ((SELECT user_id FROM user WHERE userName = ?), ?)
                  ON DUPLICATE KEY UPDATE restriction=?`;
    return query(sql, [userName, restriction, restriction]);
  }));
};

// delete dietary restriction for a user
// right now this is set up to just remove one restriction at a time
const deleteUserDietaryRestriction = (user) => {
  const { userName, restriction } = user;
  const sql = `DELETE FROM dietaryRestrictions WHERE restriction = ? 
  AND user_id = (SELECT user_id FROM user WHERE userName = ?)`;
  return query(sql, [restriction, userName]);
};

// get user dietary restrictions
const getUserDietaryRestrictions = (userName) => {
  const sql = `SELECT restriction FROM dietaryRestrictions 
                  WHERE (SELECT user_id FROM user WHERE userName = ?)`;
  return query(sql, [userName]);
};

// delete user from a group
const deleteUserFromGroup = (userName, groupName) => {
  const sql = `DELETE FROM user_group 
                WHERE user_id = (SELECT user_id FROM user WHERE userName = ?)
                AND groupp_id = (SELECT groupp_id FROM groupp WHERE groupName = ?)`;
  return query(sql, [userName, groupName]);
};

// delete user from user table
const deleteUser = (userName) => {
  const sql = 'DELETE FROM user WHERE userName = ?';
  return query(sql, [userName]);
};

// add new group to db
const addNewGroup = (newGroup) => {
  const { groupName, pricePoint } = newGroup;
  const sql = `INSERT into groupp (groupName, active, pricePoint) VALUES(?, true, ?)
                ON DUPLICATE KEY UPDATE pricePoint = ?`;
  return query(sql, [groupName, pricePoint, pricePoint]);
};

// add users and group to join table?
const addUserToGroup = (userName, groupName) => {
  const sql = `INSERT into user_group (user_id, groupp_id) VALUES 
                ((SELECT user_id FROM user WHERE userName = ?), (SELECT groupp_id FROM groupp WHERE groupName = ?))`;
  return query(sql, [userName, groupName]);
};

// allow users to change group name
const changeGroupName = (group) => {
  const { groupName, newName } = group;
  const sql = 'UPDATE groupp SET groupName = ? WHERE groupName = ?';
  return query(sql, [newName, groupName]);
};

// allow users to change group price point
const changeGroupPricePoint = (group) => {
  const { groupName, newPricePoint } = group;
  const sql = 'UPDATE groupp SET pricePoint = ? WHERE groupName = ?';
  return query(sql, [newPricePoint, groupName]);
};

// toggle group's active state between true and false
// (when a decision has been initiated or closed)
const toggleGroupStatus = (group) => {
  const { id, status } = group;
  const sql = 'UPDATE groupp SET active=? WHERE id=?';
  return query(sql, [status, id]);
};

// // delete a group from join table
// const deleteGroupFromUserGroupJoinTable = (groupName) => {
//   const sql = `DELETE FROM user_group 
//                 WHERE groupp_id = (SELECT groupp_id FROM groupp WHERE groupName = ?)`;
//   return query(sql, [groupName]);
// };

// const deleteGroupFromGroupHistory = (groupName) => {
//   const sql = `DELETE FROM groupHistory
//                 WHERE groupp_id = (SELECT groupp_id FROM groupp WHERE groupName = ?)`;
//   return query(sql, [groupName]);
// };

// delete a group from groupp table
const deleteGroup = (groupName) => {
  const sql = 'DELETE FROM groupp WHERE groupName = ?';
  return query(sql, [groupName]);
};

// add chosen location to grouphistory table
// TODO: figure out how location is being stored. Are we assigning them ids?
const addToGroupHistory = (group) => {
  const { groupName, location } = group;
  const sql = `INSERT into groupHistory (groupp_id, location_id) VALUES 
    ((SELECT groupp_id FROM groupp WHERE groupName = ?), ?)`;
  return query(sql, [groupName, location]);
};

// get group location history
const getGroupHistory = (groupName) => {
  const sql = `SELECT location_id FROM groupHistory WHERE 
                (SELECT groupp_id FROM groupp WHERE groupName = ?) = groupp_id`;
  return query(sql, [groupName]);
};

// TODO: add user image/avatar to userImages table

// TODO: obtain user info from db

// TODO: obtain group info from db

module.exports = {
  addNewUser,
  addUserStatus,
  updateUserName,
  updateUserStatus,
  addUserImage,
  updateUserImage,
  addUserDietaryRestrictions,
  updateUserDietaryRestrictions,
  getUserDietaryRestrictions,
  deleteUserDietaryRestriction,
  deleteUserFromGroup,
  deleteUser,
  addNewGroup,
  addUserToGroup,
  changeGroupName,
  changeGroupPricePoint,
  deleteGroup,
  addToGroupHistory,
  getGroupHistory,
  toggleGroupStatus,
};
