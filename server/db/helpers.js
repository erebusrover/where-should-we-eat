// database connection and helper functions
// const mysql = require('mysql');
// const util = require('util');
const { pool } = require('./config.js');

// const connection = mysql.createConnection(mysqlConfig);
// Just like `connection.query`, but returns a promise!
// const query = util.promisify(pool.query).bind(pool);

// add new user to db
const addNewUser = async (userName, googleId) => {
  const sql = 'INSERT into user (userName, google_id) VALUES (?,?)';
  return pool.query(sql, [userName, googleId]);
};

// check db for user by Google ID
const checkDb = async (googleId) => {
  const sql = 'SELECT * FROM user WHERE google_id = ?';
  return pool.query(sql, [googleId]);
};

// allow user to change their username
const updateUserName = async (userName, newUserName) => {
  const sql = 'UPDATE user SET userName = ? WHERE userName = ?';
  return pool.query(sql, [newUserName, userName]);
};

// update user status
const updateUserStatus = async (userName, newStatus) => {
  const sql = 'UPDATE user SET userStatus = ? WHERE userName = ?';
  return pool.query(sql, [newStatus, userName]);
};

const addUserImage = async (userName, image) => {
  const sql = `INSERT into userImages (user_id, image)
                VALUES ((SELECT user_id FROM user WHERE userName = ?), ?)`;
  return pool.query(sql, [userName, image]);
};

const updateUserImage = async (userName, newImage) => {
  const sql = `UPDATE userImages SET image = ? 
                WHERE user_id = (SELECT user_id FROM user WHERE userName = ?)`;
  return pool.query(sql, [newImage, userName]);
};

// BUG: multiple users with same restricion?
// add dietary restrictions to dietaryRestrictions table
const addUserDietaryRestrictions = async (userName, restrictions) => {
  // restrictions should be an array
  // for each dietary restriction, add it to table with id of user
  return Promise.all(restrictions.map((restriction) => {
    const sql = `INSERT into dietaryRestrictions (user_id, restriction) 
                  VALUES ((SELECT user_id FROM user WHERE userName = ?), ?)`;
    return pool.query(sql, [userName, restriction, restriction]);
  }));
};

// delete dietary restriction for a user
// right now this is set up to just remove one restriction at a time
const deleteUserDietaryRestriction = async (user) => {
  const { userName, restriction } = user;
  const sql = `DELETE FROM dietaryRestrictions WHERE restriction = ? 
  AND user_id = (SELECT user_id FROM user WHERE userName = ?)`;
  return pool.query(sql, [restriction, userName]);
};

// get user dietary restrictions
const getUserDietaryRestrictions = async (userName) => {
  const sql = `SELECT restriction FROM dietaryRestrictions 
                  WHERE (SELECT user_id FROM user WHERE userName = ?)`;
  return pool.query(sql, [userName]);
};

// delete user from a group
const deleteUserFromGroup = async (userName, groupName) => {
  const sql = `DELETE FROM user_group 
                WHERE user_id = (SELECT user_id FROM user WHERE userName = ?)
                AND groupp_id = (SELECT groupp_id FROM groupp WHERE groupName = ?)`;
  return pool.query(sql, [userName, groupName]);
};
// gets all users from database
const getAllUsers = () => {
  const sql = `SELECT * FROM user`
  return query(sql)
};

// delete user from user table
const deleteUser = async (userName) => {
  const sql = 'DELETE FROM user WHERE userName = ?';
  return pool.query(sql, [userName]);
};

// add new group to db
const addNewGroup = async (newGroup) => {
  const { groupName, pricePoint } = newGroup;
  const sql = `INSERT into groupp (groupName, active, pricePoint) VALUES(?, true, ?)
                ON DUPLICATE KEY UPDATE pricePoint = ?`;
  return pool.query(sql, [groupName, pricePoint, pricePoint]);
};

// add users and group to join table
const addUserToGroup = async (userName, groupName) => {
  const sql = `INSERT into user_group (user_id, groupp_id) VALUES 
                ((SELECT user_id FROM user WHERE userName = ?), (SELECT groupp_id FROM groupp WHERE groupName = ?))`;
  return pool.query(sql, [userName, groupName]);
};

// get all members from a given group
const getAllGroupMembers = async (groupName) => {
  const sql = `SELECT * FROM user WHERE user_id IN 
                (SELECT user_id FROM user_group WHERE groupp_id IN 
                  (SELECT groupp_id FROM groupp WHERE groupName = ?))`;
  return pool.query(sql, [groupName]);
};

// get all groups for a given user
const getAllUserGroups = async (userName) => {
  const sql = `SELECT * FROM groupp WHERE groupp_id IN  
                (SELECT groupp_id FROM user_group WHERE user_id IN 
                  (SELECT user_id FROM user WHERE userName = ?))`;
  return pool.query(sql, [userName]);
};

// get all active groups for a given user
const getAllActiveUserGroups = async (userName) => {
  const sql = `SELECT * FROM groupp WHERE active = true AND groupp_id IN  
                (SELECT groupp_id FROM user_group WHERE user_id IN 
                  (SELECT user_id FROM user WHERE userName = ?))`;
  return pool.query(sql, [userName]);
};

// get all inactive groups for a given user
const getAllInactiveUserGroups = async (userName) => {
  const sql = `SELECT * FROM groupp WHERE active = false AND groupp_id IN  
                (SELECT groupp_id FROM user_group WHERE user_id IN 
                  (SELECT user_id FROM user WHERE userName = ?))`;
  return pool.query(sql, [userName]);
};

// allow users to change group name
const changeGroupName = async (group) => {
  const { groupName, newName } = group;
  const sql = 'UPDATE groupp SET groupName = ? WHERE groupName = ?';
  return pool.query(sql, [newName, groupName]);
};

// allow users to change group price point
const changeGroupPricePoint = async (group) => {
  const { groupName, newPricePoint } = group;
  const sql = 'UPDATE groupp SET pricePoint = ? WHERE groupName = ?';
  return pool.query(sql, [newPricePoint, groupName]);
};

// toggle group's active state between true and false
// (when a decision has been initiated or closed)
const toggleGroupStatus = async (group) => {
  const { id, status } = group;
  const sql = 'UPDATE groupp SET active=? WHERE id=?';
  return pool.query(sql, [status, id]);
};

// delete a group from groupp table
const deleteGroup = async (groupName) => {
  const sql = 'DELETE FROM groupp WHERE groupName = ?';
  return pool.query(sql, [groupName]);
};

// add chosen location to grouphistory table
// TODO: figure out how location is being stored. Are we assigning them ids?
const addToGroupHistory = async (group) => {
  const { groupName, location } = group;
  const sql = `INSERT into groupHistory (groupp_id, location_id) VALUES 
    ((SELECT groupp_id FROM groupp WHERE groupName = ?), ?)`;
  return pool.query(sql, [groupName, location]);
};

// get group location history
const getGroupHistory = async (groupName) => {
  const sql = `SELECT location_id FROM groupHistory WHERE 
                (SELECT groupp_id FROM groupp WHERE groupName = ?) = groupp_id`;
  return pool.query(sql, [groupName]);
};

module.exports = {
  addNewUser,
  checkDb,
  updateUserName,
  updateUserStatus,
  addUserImage,
  updateUserImage,
  addUserDietaryRestrictions,
  getUserDietaryRestrictions,
  deleteUserDietaryRestriction,
  deleteUserFromGroup,
  deleteUser,
  addNewGroup,
  addUserToGroup,
  getAllGroupMembers,
  getAllUserGroups,
  getAllActiveUserGroups,
  getAllInactiveUserGroups,
  changeGroupName,
  changeGroupPricePoint,
  deleteGroup,
  addToGroupHistory,
  getGroupHistory,
  toggleGroupStatus,
  getAllUsers
};
