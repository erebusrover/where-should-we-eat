const { Router } = require('express');
const {
  addNewUser,
  addNewGroup,
  toggleGroupStatus,
  addUserDietaryRestrictions,
  addToGroupHistory,
} = require('./db/helpers');
const { getRestaurants } = require('./config/yelp');
const { getUserLocation } = require('./config/google');

const router = Router();

// POST to /users to add user to db --> how will google auth be involved in this?
router.post('/users', (req, res) => {
  // get username from req body
  const newUser = {
    userName: req.body.userName,
    userStatus: req.body.userStatus,
  };
  // use db helper function to add new user to db
  addNewUser(newUser).then(() => {
    res.sendStatus(201);
  }).catch(() => {
    res.sendStatus(400);
  });
});


// PATCH to /users/:username to update user status or username
router.patch('/users/:username', (req, res) => {

});

// POST to add dietary restrictions for a given user
router.post('/users/:username/dietaryRestrictions', (req, res) => {
  addUserDietaryRestrictions().then(() => {
    res.sendStatus(201);
  }).catch(() => {
    res.sendStatus(400);
  });
});

// DELETE a dietary restriction for a given user
router.delete('/users/:username/dietaryRestrictions', (req, res) => {

});

// POST /history adds a new place to the grouphistory table
// whenever a choice is made
// how are we storing the locations in this table? by name? id?
router.post('/history', (req, res) => {
  const { groupName, chosenLocation } = req.body;
  addToGroupHistory(groupName, chosenLocation).then(() => {
    res.sendStatus(201);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  })
});

// GET /login verify user login using Passport --> google auth?
// router.get('/login', passport.authenticate('google', {
// scope: ['profile', 'email', 'openid'],
// }));

// GET / renders home page, with info about active groups and sleeping groups

// GET /preferences renders preferences/settings page for given user? /preferences:id?
// call addUserDietaryRestrictions here

// POST /groups to add new group to db
router.post('/groups', (req, res) => {
  // use db helper function to add new group to db
  addNewGroup().then(() => {

  }).catch(() => {

  });
});

// PATCH /groups/:group to update group info
router.patch('/groups/:group', (req, res) => {

});


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
      console.log('there was an error');
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
