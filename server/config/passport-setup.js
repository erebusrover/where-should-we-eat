const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const { addNewUser, checkDb } = require('../db/helpers');

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: keys.googleAuth.clientID,
    clientSecret: keys.googleAuth.clientSecret,
    callbackURL: '/api/login/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    // console.log(profile.id, profile.displayName);
    checkDb(profile.id)
      .then((currentUser) => {
        console.log(currentUser);
        if (currentUser) {
          return done(null, currentUser);
        }
        if (!currentUser) {
          addNewUser(profile.displayName, profile.id)
            .then((newUser) => {
              console.log(`new user added: ${newUser}`);
              return done(null, newUser);
            });
        }
      });
  }),
);

passport.serializeUser((user, next) => {
  next(null, user.google);
});
