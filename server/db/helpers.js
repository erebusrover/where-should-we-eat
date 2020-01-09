// database connection and helper functions
const { pool } = require('./config.js');

// const connection = mysql.createConnection(mysqlConfig);
// Just like `connection.query`, but returns a promise!
// const query = util.promisify(pool.query).bind(pool);

// get user status
const getUserStatus = async (userName) => {
  const sql = 'SELECT userStatus FROM user WHERE userName = ?';
  return pool.query(sql, [userName]);
};
// add new user to db

// const addNewUser = async (userName, googleId, userStatus) => {
//   const sql = 'INSERT into user (userName, google_id, userStatus) VALUES (?,?,?)';
//   return pool.query(sql, [userName, googleId, userStatus]);

// add new user to db
const addNewUser = async (userName) => {
  const sql = 'INSERT into user (userName) VALUES (?)';
  return pool.query(sql, [userName]);
};

// check db for user by Google ID
// const checkDb = async (googleId) => {
//   const sql = 'SELECT * FROM user WHERE google_id = ?';
//   return pool.query(sql, [googleId]);
// };

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

// TODO: allow multiple users to have the same dietary restrictions
// add dietary restrictions to dietaryRestrictions table
const addUserDietaryRestrictions = async (userName, restrictions) =>
  // restrictions should be an array
  // for each dietary restriction, add it to table with id of user
  Promise.all(
    restrictions.map(restriction => {
      const sql = `INSERT into dietaryRestrictions (user_id, restriction) 
                  VALUES ((SELECT user_id FROM user WHERE userName = ?), ?)`;
      return pool.query(sql, [userName, restriction, restriction]);
    }),
  );
// allow user to update their dietary restrictions
// allow user to change their username
const updateUserDietaryRestrictions = async (userName, restrictions) => {
  Promise.all(
    restrictions.map(restriction => {
      const sql = `UPDATE dietaryRestrictions SET restriction = ?
                  WHERE user_id = (SELECT user_id FROM user WHERE userName = ?)`;
      return pool.query(sql, [restriction, userName]);
    }),
  );
};

// delete dietary restriction for a user
// right now this is set up to just remove one restriction at a time
const deleteUserDietaryRestriction = async user => {
  const { userName, restriction } = user;
  const sql = `DELETE FROM dietaryRestrictions WHERE restriction = ? 
  AND user_id = (SELECT user_id FROM user WHERE userName = ?)`;
  return pool.query(sql, [restriction, userName]);
};

// get user dietary restrictions
const getUserDietaryRestrictions = async userName => {
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
  const sql = 'SELECT * FROM user';
  return pool.query(sql);
};

// delete user from db
const deleteUser = async userName => {
  const sql = 'DELETE FROM user WHERE userName = ?';
  return pool.query(sql, [userName]);
};

// add new group to db
const addNewGroup = async newGroup => {
  const { groupName, pricePoint } = newGroup;
  const sql = `INSERT into groupp (groupName, active, pricePoint) VALUES(?, true, ?)
                ON DUPLICATE KEY UPDATE pricePoint = ?`;
  return pool.query(sql, [groupName, pricePoint, pricePoint]);
};

// add user and group to join table
const addUserToGroup = async (userName, groupName) => {
  const sql = `INSERT into user_group (user_id, groupp_id) VALUES 
                ((SELECT user_id FROM user WHERE userName = ?), (SELECT groupp_id FROM groupp WHERE groupName = ?))`;
  return pool.query(sql, [userName, groupName]);
};

// get all members from a given group
const getAllGroupMembers = async groupName => {
  const sql = `SELECT * FROM user WHERE user_id IN 
                (SELECT user_id FROM user_group WHERE groupp_id IN 
                  (SELECT groupp_id FROM groupp WHERE groupName = ?))`;
  return pool.query(sql, [groupName]);
};

const getAllGroupMembersImages = async groupName => {
  const sql = `SELECT image FROM userImages WHERE user_id IN 
                (SELECT user_id FROM user_group WHERE groupp_id IN 
                  (SELECT groupp_id FROM groupp WHERE groupName = ?))`;
  return pool.query(sql, [groupName]);
};

// get all dietary restrictions for users of a given group
const getAllUserRestrictions = async groupName => {
  const sql = `SELECT restriction from dietaryRestrictions WHERE user_id IN
                (SELECT user_id FROM user_group WHERE groupp_id IN 
                  (SELECT groupp_id FROM groupp WHERE groupName = ?))`;
  return pool.query(sql, [groupName]);
};

// get all groups that a given user belongs to
const getAllUserGroups = async userName => {
  const sql = `SELECT * FROM groupp WHERE groupp_id IN  
                (SELECT groupp_id FROM user_group WHERE user_id IN 
                  (SELECT user_id FROM user WHERE userName = ?))`;
  return pool.query(sql, [userName]);
};

// get all active groups that a given user belongs to
const getAllActiveUserGroups = async userName => {
  const sql = `SELECT * FROM groupp WHERE active = true AND groupp_id IN  
                (SELECT groupp_id FROM user_group WHERE user_id IN 
                  (SELECT user_id FROM user WHERE userName = ?))`;
  return pool.query(sql, [userName]);
};

// get all inactive groups that a given user belongs to
const getAllInactiveUserGroups = async userName => {
  const sql = `SELECT * FROM groupp WHERE active = false AND groupp_id IN  
                (SELECT groupp_id FROM user_group WHERE user_id IN 
                  (SELECT user_id FROM user WHERE userName = ?))`;
  return pool.query(sql, [userName]);
};

// allow users to change group name
const changeGroupName = async group => {
  const { groupName, newName } = group;
  const sql = 'UPDATE groupp SET groupName = ? WHERE groupName = ?';
  return pool.query(sql, [newName, groupName]);
};

// allow users to change group price point
const changeGroupPricePoint = async group => {
  const { groupName, newPricePoint } = group;
  const sql = 'UPDATE groupp SET pricePoint = ? WHERE groupName = ?';
  return pool.query(sql, [newPricePoint, groupName]);
};

// retrieve group pricepoint from db
const getGroupPricePoint = async groupName => {
  const sql = 'SELECT pricePoint FROM groupp where groupName = ?';
  return pool.query(sql, [groupName]);
};

// toggle group's active state between true and false
// (when a decision has been initiated or closed)
const toggleGroupStatus = async group => {
  const { id, status } = group;
  const sql = 'UPDATE groupp SET active=? WHERE id=?';
  return pool.query(sql, [status, id]);
};

// delete a group from groupp table
const deleteGroup = async groupName => {
  const sql = 'DELETE FROM groupp WHERE groupName = ?';
  return pool.query(sql, [groupName]);
};

// add chosen location to grouphistory table
const addToGroupHistory = async group => {
  const { groupName, locId, name } = group;
  // debugger;
  const sql = `INSERT into groupHistory (groupp_id, location_id, restaurant_name) VALUES 
                ((SELECT groupp_id FROM groupp WHERE groupName = ?), ?, ?)`;
  // debugger;
  return pool.query(sql, [groupName, locId, name]);
};

// get group location history
const getGroupHistory = async groupName => {
  const sql = `SELECT restaurant_name FROM groupHistory WHERE 
                (SELECT groupp_id FROM groupp WHERE groupName = ?) = groupp_id`;
  return pool.query(sql, [groupName]);
};

// add chooser to groupp table
const addChooserToGroup = async (groupName, chooser) => {
  const sql = 'UPDATE groupp SET choice = ? WHERE groupName = ?';
  return pool.query(sql, [chooser, groupName]);
};

// get chooser from groupp table
const getChooserFromGroupTable = async groupName => {
  const sql = 'SELECT choice FROM groupp WHERE groupName = ?';
  return pool.query(sql, [groupName]);
};

module.exports = {
  addNewUser,
  updateUserName,
  updateUserStatus,
  addUserImage,
  updateUserImage,
  addUserDietaryRestrictions,
  getUserDietaryRestrictions,
  updateUserDietaryRestrictions,
  deleteUserDietaryRestriction,
  deleteUserFromGroup,
  deleteUser,
  addNewGroup,
  addUserToGroup,
  getAllGroupMembers,
  getAllGroupMembersImages,
  getAllUserRestrictions,
  getAllUserGroups,
  getAllActiveUserGroups,
  getAllInactiveUserGroups,
  changeGroupName,
  getGroupPricePoint,
  changeGroupPricePoint,
  deleteGroup,
  addToGroupHistory,
  getGroupHistory,
  addChooserToGroup,
  getChooserFromGroupTable,
  toggleGroupStatus,
  getAllUsers,
  // checkDb,
  getUserStatus,
};
