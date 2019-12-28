const { Router } = require('express');
const { addNewUser, toggleGroupStatus } = require('./db/helpers');
const { getRestaurants } = require('./config/yelp');
const { getUserLocation } = require('./config/google');

const router = Router();

// POST to /signup adds users to db --> how will google auth be involved in this?
router.post('/signup', (req, res) => {
  // get username from req body
  const newUser = {
    userName: req.body.userName,
    userStatus: req.body.userStatus,
  };
  // use db helper function to add new user to db
  addNewUser(newUser).then(() => {
    res.send();
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

// POST /createGroup adds new group to db
router.post('/createGroup', (req, res) => {
  // use db helper function to add new group to db
});

// GET /group:id renders given group page

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

// GET /choices:id renders directions and info about choice

// PATCH /group:id/active toggles group 'active' property between true and false
router.patch('/group:id/active', (req, res) => {
  const { id, status } = req.body;
  toggleGroupStatus(id, status).then(() => {
    res.send();
  }).catch(() => {
    res.sendStatus(400);
  });
});
