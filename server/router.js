/* eslint-disable arrow-body-style */
/* eslint-disable prefer-arrow-callback */
const { Router } = require('express');
const passport = require('passport');
const _ = require('lodash');

// require DB helpers
const {
  getUserStatus,
  addNewUser,
  deleteUser,
  updateUserName,
  updateUserStatus,
  addUserImage,
  updateUserImage,
  addUserDietaryRestrictions,
  getUserDietaryRestrictions,
  updateUserDietaryRestrictions,
  deleteUserDietaryRestriction,
  addNewGroup,
  deleteGroup,
  addUserToGroup,
  deleteUserFromGroup,
  getAllGroupMembers,
  getAllGroupMembersImages,
  getAllUserRestrictions,
  getAllUserGroups,
  getAllActiveUserGroups,
  getAllInactiveUserGroups,
  changeGroupName,
  getGroupPricePoint,
  changeGroupPricePoint,
  addToGroupHistory,
  getGroupHistory,
  addChooserToGroup,
  getChooserFromGroupTable,
  toggleGroupStatus,
  getAllUsers,
} = require('./db/helpers');
// require Google and Yelp API functions
const { getRestaurants } = require('./config/yelp');
// const { getUserLocation } = require('./config/google');

const router = Router();

// handleSubmitPreferences App.jsx
// POST to /users to add user to db
router.post('/users', (req, res) => {
  // get username from req body
  const { userName } = req.body;
  addNewUser(userName)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err.message);
      // debugger;
      res.sendStatus(400);
    });
});

// handleUserSettings App.jsx
// POST to /users/:userName/newUserName to add username
router.post('/users/:userName/userName', (req, res) => {
  // get username from params and new username from body
  const { userName } = req.params;
  addNewUser(userName)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      // console.error(err.message);
      // debugger;
      res.sendStatus(400);
    });
});

// DELETE /users/:username to delete a user account from db
router.delete('/users/:userName', (req, res) => {
  const { userName } = req.params;
  deleteUser(userName)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// GET to /users/:username/status to get user status
router.get('/users/:userName/status', (req, res) => {
  const { userName } = req.params;

  getUserStatus(userName)
    // TODO this is  probably why the user status is angry
    .then(response => {
      res.status(200);
      res.send(response[0]);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// PATCH to /users/:username/status to update user status
router.post('/users/:userName/status', (req, res) => {
  const { userName } = req.params;
  const { newStatus } = req.body;
  updateUserStatus(userName, newStatus)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(400);
    });
});

// POST to /users/:user/image
router.post('/users/:userName/image', (req, res) => {
  const { userName } = req.params;
  const { image } = req.body;
  addUserImage(userName, image)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// PATCH /users/:user/image
router.patch('/users/:userName/image', (req, res) => {
  const { userName } = req.params;
  const { newImage } = req.body;
  updateUserImage(userName, newImage)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// POST to add dietary restrictions for a given user
// TODO: account for duplicates
router.post('/users/:userName/dietaryRestrictions', (req, res) => {
  // restrictions must be an array
  const { restrictions } = req.body;
  const { userName } = req.params;
  addUserDietaryRestrictions(userName, restrictions)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

router.patch('/users/:userName/dietaryRestrictions', (req, res) => {
  const { restrictions } = req.body;
  const { userName } = req.params;
  updateUserDietaryRestrictions(userName, restrictions)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(400);
    });
});

// GET all users from database
router.get('/users', (req, res) => {
  getAllUsers()
    .then(response => {
      res.status(200);
      res.send(response[0]);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// GET dietary restrictions for a given user
router.get('/users/:userName/dietaryRestrictions', (req, res) => {
  const { userName } = req.params;
  getUserDietaryRestrictions(userName)
    .then(response => {
      res.status(200);
      res.send(response[0]);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// DELETE a dietary restriction for a given user
router.delete('/users/:userName/dietaryRestrictions', (req, res) => {
  const { restriction } = req.body;
  const { userName } = req.params;
  const user = {
    userName,
    restriction,
  };
  deleteUserDietaryRestriction(user)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// POST /groups to add new group to db
// also adds whichever user created the group to the user_group join table
router.post('/groups', (req, res) => {
  const { groupName, pricePoint, userName } = req.body;
  // const priceNumber = pricePoint.length;
  const newGroup = {
    groupName,
    pricePoint,
  };
  // use db helper function to add new group to db
  addNewGroup(newGroup)
    .then(() => {
      // add user who created group to group
      addUserToGroup(userName, groupName);
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      debugger;
      res.sendStatus(400);
    });
});

// DELETE /groups deletes a group
router.delete('/groups', (req, res) => {
  const { groupName } = req.body;
  deleteGroup(groupName)
    .then(() => {
      res.send(200);
    })
    .catch(() => {
      res.send(400);
    });
});

// POST /user_group adds a user to a particular group
// by adding fields to user_group table
// to indicate which users belong to which group
router.post('/user_group', (req, res) => {
  const { userName, groupName } = req.body;
  addUserToGroup(userName, groupName)
    .then(() => {
      res.send(201);
    })
    .catch(() => {
      res.send(400);
    });
});

// get all members and avatars from a given group
router.get('/groups/:groupName/users', (req, res) => {
  const { groupName } = req.params;
  return getAllGroupMembers(groupName)
    .then(function(members) {
      // console.log(members);
      // console.log(groupName);
      // get user images
      return getAllGroupMembersImages(groupName)
        .then(function(images) {
          // console.log(images[0]);
          // console.log(members[0]);
          const allMembersInfo = members[0].map(member => {
            return images[0].map(image => {
              return _.defaults(member, image);
            });
          });
          const response = [];
          allMembersInfo.forEach(member => {
            response.push(member[0]);
          });
          return response;
        })
        .then(function(response) {
          res.status(200);
          res.send(response);
        });
    })
    .catch(() => {
      res.send(400);
    });
});

// get all groups for a given user
router.get('/users/:userName/groups', (req, res) => {
  const { userName } = req.params;
  getAllUserGroups(userName)
    .then(response => {
      res.status(200);
      res.send(response[0]);
    })
    .catch(err => {
      console.error(err);
      res.send(400);
    });
});

// get all active groups for a given user
router.get('/groups/:userName/groups/active', (req, res) => {
  const { userName } = req.params;
  getAllActiveUserGroups(userName)
    .then(response => {
      res.status(200);
      res.send(response[0]);
    })
    .catch(() => {
      res.send(400);
    });
});

// get all inactive groups for a given user
router.get('/groups/:userName/groups/inactive', (req, res) => {
  const { userName } = req.params;
  getAllInactiveUserGroups(userName)
    .then(response => {
      res.status(200);
      res.send(response[0]);
    })
    .catch(() => {
      res.send(400);
    });
});

// DELETE /groups/:userName to delete a user from a particular group
router.delete('/groups/:userName', (req, res) => {
  const { userName, groupName } = req.body;
  deleteUserFromGroup(userName, groupName)
    .then(() => {
      res.send(200);
    })
    .catch(() => {
      res.send(400);
    });
});

// PATCH /groups/:groupName/groupName to change group name
router.patch('/groups/:groupName/groupName', (req, res) => {
  const { groupName } = req.params;
  const { newName } = req.body;
  const group = {
    groupName,
    newName,
  };
  changeGroupName(group)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// PATCH /groups/:groupName/pricePoint to change group price point
router.patch('/groups/:groupName/pricePoint', (req, res) => {
  const { groupName } = req.params;
  const { newPricePoint } = req.body;
  // const priceNumber = newPricePoint.length;
  const group = {
    groupName,
    newPricePoint,
  };
  changeGroupPricePoint(group)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// GET /groups/:groupName/pricePoint to get group price point
router.get('/groups/:groupName/pricePoint', (req, res) => {
  const { groupName } = req.params;
  // const priceNumber = newPricePoint.length;
  getGroupPricePoint(groupName)
    .then(response => {
      res.status(201);
      res.send(response[0]);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// POST /groupHistory adds a new place to the grouphistory table
// whenever a choice is made
// how are we storing the locations in this table? by name? id?
router.post('/groupHistory', (req, res) => {
  const { groupName, locId, name } = req.body;
  // debugger;
  const group = {
    groupName,
    locId,
    name
  };
  addToGroupHistory(group)
    .then(() => {
      // debugger;
      res.sendStatus(201);
    })
    .catch(error => {
      // debugger;
      console.error(error);
      res.sendStatus(400);
    });
});

// GET /groupHistory retrieves group history
router.get('/groupHistory/:groupName', (req, res) => {
  const { groupName } = req.params;
  // debugger;
  getGroupHistory(groupName)
    .then(response => {
      // debugger;
      res.status(200);
      res.send(response[0]);
    })
    .catch((err) => {
      console.error(err);
      // debugger;
      res.sendStatus(400);
    });
});

// GET /login verify user login using Passport --> google auth?
router.get(
  '/login',
  passport.authenticate('google', {
    scope: ['profile'],
  }),
);

// GET /redirect to reroute back to the app from the google consent screen
// router.get('/login/redirect', passport.authenticate('google'), (req, res) => {
//   const { userName } = res.req._passport.session.user[0][0];
//   res.send('YOU ARE NOW LOGGED IN TO WSWE');
// });

// GET /logout logs user out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// GET /choices renders page with a few choices of where to eat
router.get('/choices/:groupName/:categories', (req, res) => {
  const { groupName, categories } = req.params;
  // console.log(req);
  // console.log(groupName);
  const userCats = [];
  userCats.push(categories);
  // console.log(userCats);
  // db query to get dietary restrictions, pricepoint?
  // const categories = getAllUserRestrictions(groupName);
  return getAllUserRestrictions(groupName)
    .then(function(restrictions) {
      return getGroupPricePoint(groupName).then(function(pricePoint) {
        const price = Object.values(pricePoint[0][0]).toString().length;
        // return getUserLocation().then(function(location) {
        //   const restrCats = restrictions[0].map(restriction => {
        //     return restriction.restriction;
        //   });
        //   restrCats.forEach(restr => {
        //     userCats.push(restr);
        //   });
        //   console.log(userCats);
        //   // const { lat, lng } = location.data.location;
        //   // this is hard coded due to geolocation issues --> getUserLocaton returns location of google server
          const query = {
            latitude: 29.96856689453125,
            longitude: -90.0733642578125,
            radius: 5000,
            categories,
            price,
          };
          return getRestaurants(query).then(function(response) {
            // console.log(response);
            const { businesses } = response.data;
            res.status(200);
            res.send(businesses);
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
});

// GET /choices:/id renders directions and info about choice

// PATCH /groups/:id/active toggles group 'active' property between true and false
router.patch('/groups:id/active', (req, res) => {
  const { id, status } = req.body;
  toggleGroupStatus(id, status)
    .then(() => {
      res.send();
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// GET /groups/chooser adds the randomly chosen user to the "choice" field in groupp
router.get('/groups/:groupName/chooser', (req, res) => {
  const { groupName } = req.params;
  getChooserFromGroupTable(groupName)
    .then(response => {
      res.status(200);
      res.send(response[0]);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(400);
    });
});

// POST /groups/chooser adds the randomly chosen user to the "choice" field in groupp
router.post('/groups/:groupName/chooser', (req, res) => {
  const { groupName } = req.params;
  const { chooser } = req.body;
  addChooserToGroup(groupName, chooser)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(400);
    });
});

// GET / renders home page, with info about active groups and sleeping groups

// GET /preferences renders preferences/settings page for given user? /preferences:id?
// call addUserDietaryRestrictions here

// GET /groups:id renders given group page

// GET /winner renders winner page for given user,
// who is presented with option to make the choice or pass

// GET /passed renders page with 'PASSED: -5' message to user,
// has link to get back to main group page (GET /group:id)

module.exports.router = router;
