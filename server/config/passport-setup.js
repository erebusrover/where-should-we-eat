const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy([
    // options for google strategy
  ]), () => {
    // passport callback function
  };
);

// Export this middleware for use in the app