const { Router } = require('express');
// require DB helpers
const {
  addNewUser,
  deleteUserFromGroup,
  updateUserStatus,
  addUserDietaryRestrictions,
  getUserDietaryRestrictions,
  deleteUserDietaryRestriction,
  addNewGroup,
  addToUserGroupJoinTable,
  changeGroupName,
  changeGroupPricePoint,
  deleteGroup,
  addToGroupHistory,
  getGroupHistory,
  toggleGroupStatus,
} = require('./db/helpers');
// require Google and Yelp API functions
const { getRestaurants } = require('./config/yelp');
const { getUserLocation } = require('./config/google');

const router = Router();

// POST to /users to add user to db --> how will google auth be involved in this?
// TODO: separate userstatus change from here
router.post('/users', (req, res) => {
  // get username from req body
  const { userName, userStatus } = req.body;
  const newUser = {
    userName,
    userStatus,
  };
  // use db helper function to add new user to db
  addNewUser(newUser).then(() => {
    res.sendStatus(201);
  }).catch(() => {
    res.sendStatus(400);
  });
});

// DELETE /groups/:userName to delete a user from a particular group
router.delete('/user_group/', (req, res) => {
  const { userName, groupName } = req.body;
  deleteUserFromGroup(userName, groupName).then(() => {
    res.send(200);
  }).catch((error) => {
    res.send(400);
  });
});

// DELETE /users/:username to delete a user account from db
router.delete('users/:userName', (req, res) => {
  const { userName } = req.params;
  deleteUserFromGroup(userName).then(() => {
    
  })
});

// PATCH to /users/:username/status to update user status
router.patch('/users/:userName/status', (req, res) => {
  // get username from params and new status from body
  const { userName } = req.params;
  const { newStatus } = req.body;
  const user = {
    userName,
    newStatus,
  };
  updateUserStatus(user).then(() => {
    res.sendStatus(201);
  }).catch(() => {
    res.sendStatus(400);
  });
});

// PATCH to /users/:userName/newUserName to update username?
// not sure if this is necessary/desirable functionality
router.patch('/users/:userName/newUserName', (req, res) => {
  // get username from params and new username from body
  const { userName } = req.params;
  const { newUserName } = req.body;

});

// POST to add dietary restrictions for a given user
router.post('/users/:userName/dietaryRestrictions', (req, res) => {
  // restrictions must be an array
  const { restrictions } = req.body;
  const { userName } = req.params;
  const user = {
    userName,
    restrictions,
  };
  addUserDietaryRestrictions(user).then(() => {
    res.sendStatus(201);
  }).catch(() => {
    res.sendStatus(400);
  });
});

// GET dietary restrictions for a given user
router.get('/users/:userName/dietaryRestrictions', (req, res) => {
  const { userName } = req.params;
  getUserDietaryRestrictions(userName).then((response) => {
    res.status(200);
    res.send(response);
  }).catch((error) => {
    console.log(error);
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
  deleteUserDietaryRestriction(user).then(() => {
    res.sendStatus(200);
  }).catch(() => {
    res.sendStatus(400);
  });
});

// POST /groups to add new group to db
// should also add whichever user created the group to the user_group join table
router.post('/groups', (req, res) => {
  const { groupName, pricePoint, userName } = req.body;
  const newGroup = {
    groupName,
    pricePoint,
  };
  // use db helper function to add new group to db
  addNewGroup(newGroup).then(() => {
    addToUserGroupJoinTable(userName, groupName);
  }).then(() => {
    res.sendStatus(201);
  }).catch(() => {
    res.sendStatus(400);
  });
});

// DELETE /groups deletes a group
router.delete('/groups', (req, res) => {
  const { groupName } = req.body;
  deleteGroup(groupName)
    .then(() => {
      res.send(200);
    }).catch((error) => {
      console.log(error);
      res.send(400);
    });
});

// POST /user_group adds fields to user_group table
// to indicate which users belong to which group
router.post('/user_group', (req, res) => {
  const { userName, groupName } = req.body;
  addToUserGroupJoinTable(userName, groupName).then(() => {
    res.send(201);
  }).catch((error) => {
    console.log(error);
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
  changeGroupName(group).then(() => {
    res.sendStatus(201);
  }).catch(() => {
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
  changeGroupPricePoint(group).then(() => {
    res.sendStatus(201);
  }).catch(() => {
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
  addToGroupHistory(group).then(() => {
    res.sendStatus(201);
  }).catch(() => {
    res.sendStatus(400);
  });
});

// GET /groupHistory retrieves group history
router.get('/groupHistory', (req, res) => {
  const { groupName } = req.body;
  getGroupHistory(groupName).then((response) => {
    res.status(200);
    res.send(response);
  }).catch(() => {
    res.sendStatus(400);
  });
});

// GET /login verify user login using Passport --> google auth?
// router.get('/login', passport.authenticate('google', {
// scope: ['profile', 'email', 'openid'],
// }));

// GET / renders home page, with info about active groups and sleeping groups

// GET /preferences renders preferences/settings page for given user? /preferences:id?
// call addUserDietaryRestrictions here



// GET /groups:id renders given group page

// GET /winner renders winner page for given user,
// who is presented with option to make the choice or pass

// GET /passed renders page with 'PASSED: -5' message to user,
// has link to get back to main group page (GET /group:id)


// GET /choices renders page with a few choices of where to eat, with a timer.
// clicking on a given choice will ...render choices:id page for all users?
router.get('/choices', (req, res) => {
  const { radius, categories, price } = req.body;
  // req body should contain query argument for get Restaurants (see config/yelp.js)
  // get user's location
  getUserLocation().then((response) => {
    // get the lat and lng info from that api call
    const { lat, lng } = response.location;
    // use it and destructured props from req body to create query to pass to getRestaurants
    const query = {
      latitude: lat,
      longitude: lng,
      radius,
      categories,
      price,
    };
    getRestaurants(query);
  })
    .then((restaurants) => {
      res.send(restaurants);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// GET /choices:/id renders directions and info about choice

// PATCH /groups/:id/active toggles group 'active' property between true and false
router.patch('/groups:id/active', (req, res) => {
  const { id, status } = req.body;
  toggleGroupStatus(id, status).then(() => {
    res.send();
  }).catch(() => {
    res.sendStatus(400);
  });
});

module.exports.router = router;
