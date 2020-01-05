/* eslint-disable arrow-body-style */
/* eslint-disable prefer-arrow-callback */
const { Router } = require('express');
const passport = require('passport');

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
  deleteUserDietaryRestriction,
  addNewGroup,
  deleteGroup,
  addUserToGroup,
  deleteUserFromGroup,
  getAllGroupMembers,
  getAllUserRestrictions,
  getAllUserGroups,
  getAllActiveUserGroups,
  getAllInactiveUserGroups,
  changeGroupName,
  changeGroupPricePoint,
  addToGroupHistory,
  getGroupHistory,
  toggleGroupStatus,
  getAllUsers,
} = require('./db/helpers');
// require Google and Yelp API functions
const { getRestaurants } = require('./config/yelp');
const { getUserLocation } = require('./config/google');

const router = Router();

// POST to /users to add user to db
router.post('/users', (req, res) => {
  // get username from req body
  const { userName } = req.body;
  addNewUser(userName)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});


// PATCH to /users/:userName/newUserName to update username
router.post('/users/:userName/userName', (req, res) => {
  // get username from params and new username from body
  const { userName } = req.params;
  const { userStatus } = req.body;
  addNewUser(userName)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
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
  getUserStatus(userName, newStatus)
    .then(() => {
      res.sendStatus(201);
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
    .catch((err) => {
      console.log(err);
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

// GET all users from database
router.get('/users', (req, res) => {
  getAllUsers()
    .then((response) => {
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
    .then((response) => {
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
    .catch(() => {
      res.sendStatus(400);
    });
});

// DELETE /groups deletes a group
router.delete('/groups', (req, res) => {
  const { groupName } = req.body;
  deleteGroup(groupName)
    .then(() => {
      res.send(200);
    }).catch(() => {
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

// get all members from a given group
router.get('/groups/:groupName/users', (req, res) => {
  const { groupName } = req.params;
  getAllGroupMembers(groupName)
    .then((response) => {
      res.status(200);
      res.send(response[0]);
    })
    .catch(() => {
      res.send(400);
    });
});

// get all groups for a given user
router.get('/users/:userName/groups', (req, res) => {
  const { userName } = req.params;
  getAllUserGroups(userName)
    .then((response) => {
      res.status(200);
      res.send(response[0]);
    })
    .catch((err) => {
      console.log(err);
      res.send(400);
    });
});

// get all active groups for a given user
router.get('/groups/:userName/groups/active', (req, res) => {
  const { userName } = req.params;
  getAllActiveUserGroups(userName)
    .then((response) => {
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
    .then((response) => {
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
  // for now, price point must be single integer
  // what if we wanted to include multiple price points
  // when is price point set, and by whom?
  const { newPricePoint } = req.body;
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

// POST /groupHistory adds a new place to the grouphistory table
// whenever a choice is made
// how are we storing the locations in this table? by name? id?
router.post('/groupHistory', (req, res) => {
  const { groupName, location } = req.body;
  const group = {
    groupName,
    location,
  };
  addToGroupHistory(group)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// GET /groupHistory retrieves group history
router.get('/groupHistory', (req, res) => {
  const { groupName } = req.body;
  getGroupHistory(groupName)
    .then((response) => {
      res.status(200);
      res.send(response[0]);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// GET /login verify user login using Passport --> google auth?
router.get('/login', passport.authenticate('google', {
  scope: ['profile'],
}))

// GET /redirect to reroute back to the app from the google consent screen
router.get('/login/redirect', passport.authenticate('google'), (req, res) => {
  const { userName } = res.req._passport.session.user[0][0];
  // res.send(userName);
  res.redirect('/');
});


// GET /logout logs user out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// GET /choices renders page with a few choices of where to eat, with a timer.
// clicking on a given choice will ...render choices:id page for all users?
router.get('/choices', (req, res) => {
  const { groupName } = req.body;
  // db query to get dietary restrictions, pricepoint?
  // const categories = getAllUserRestrictions(groupName);
  return getAllUserRestrictions(groupName).then(function (restrictions) {
    return getUserLocation().then(function (location) {
      const categories = restrictions[0].map((restriction) => {
        return restriction.restriction;
      });
      const { lat, lng } = location.data.location;
      const query = {
        latitude: lat,
        longitude: lng,
        radius: 40000,
        categories: categories[0],
        price: 1,
      };
      return getRestaurants(query).then(function (response) {
        const { businesses } = response.data;
        res.status(200);
        res.send(businesses);
      });
    });
  })
    .catch((err) => {
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

// GET / renders home page, with info about active groups and sleeping groups

// GET /preferences renders preferences/settings page for given user? /preferences:id?
// call addUserDietaryRestrictions here


// GET /groups:id renders given group page

// GET /winner renders winner page for given user,
// who is presented with option to make the choice or pass

// GET /passed renders page with 'PASSED: -5' message to user,
// has link to get back to main group page (GET /group:id)


module.exports.router = router;
