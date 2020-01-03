const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const { addNewUser, checkDb } = require('../db/helpers');

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: keys.googleAuth.clientID,
    clientSecret: keys.googleAuth.clientSecret,
    callbackURL: '/',
  }, (accessToken, refreshToken, profile, done) => {
    // eslint-disable-next-line no-console
    console.log(profile.id, profile.displayName);
    // done();
    // checkDb(profile.id)
    //   .then((currentUser) => {
    //     if (currentUser) {
    //       done(null, currentUser);
    //     } else {
    //       addNewUser(profile.displayName, profile.id)
    //         .then((newUser) => {
    //           done(null, newUser);
    //         });
    //     }
    //   });
  }),
);

passport.serializeUser((user, next) => {
  next(null, user.google);
});
