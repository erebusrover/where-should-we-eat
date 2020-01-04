const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const { addNewUser, checkDb } = require('../db/helpers');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: keys.googleAuth.clientID,
    clientSecret: keys.googleAuth.clientSecret,
    callbackURL: '/api/login/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    checkDb(profile.id)
      .then((currentUser) => {
        if (currentUser[0].length === 1) {
          done(null, currentUser);
        }
        if (currentUser[0].length === 0) {
          console.log(profile.id);
          addNewUser(profile.displayName, profile.id)
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
  }),
);
