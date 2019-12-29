// database connection and helper functions
const mysql = require('mysql');
const util = require('util');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
// Just like `connection.query`, but returns a promise!
const query = util.promisify(connection.query).bind(connection);

// add new user to db
// newUser should look something like:
// {
//   userName,
//   userStatus
// }
const addNewUser = (newUser) => {
  const { userName, userStatus } = newUser;
  const sql = `INSERT into user (userName, userStatus) VALUES ("${userName}", "${userStatus}")
                ON DUPLICATE KEY UPDATE userStatus = "${userStatus}"`;
  return query(sql);
};

// const sql = `INSERT into phrases (kor, eng, rom, status) VALUES ("${korean}", "${english}", "${romanized}", "Not yet")
// ON DUPLICATE KEY UPDATE kor = VALUES(kor)`;

// TODO: add dietary restrictions to dietaryRestrictions table
// once user has selected dietary restrictions within their preferences
const addUserDietaryRestrictions = (user) => {
  // dietaryRestrictions should be an array
  const { userName, dietaryRestrictions } = user;
  // for each dietary restriction, add it to table with id of user
  dietaryRestrictions.map((dietaryRestriction) => {
    const sql = `INSERT into dietaryRestrictions (resßtriction, userid) 
                  VALUES ("${dietaryRestriction}", (SELECT userid FROM user WHERE userName = "${userName}"))`;
    return query(sql);
  });
};


// TODO: add new group to db
const addNewGroup = (newGroup) => {

};

// TODO: obtain user info from db

// TODO: obtain group info from db

// TODO: toggle group's active state between true and false
// (when a decision has been initiated or closed)
const toggleGroupStatus = (id, status) => {
  const sql = `UPDATE groupp SET active="${status}" WHERE id=${id}`;
  return query(sql);
};

module.exports.addNewUser = addNewUser;
module.exports.addUserDietaryRestrictions = addUserDietaryRestrictions;
module.exports.toggleGroupStatus = toggleGroupStatus;
