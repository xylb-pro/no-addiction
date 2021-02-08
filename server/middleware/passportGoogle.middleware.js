const GoogleStrategy = require('passport-google-oauth20');
const services = require('../services');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/api/auth/google/redirect',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(accessToken);
          const email = profile.emails[0].value;
          const thisUser = await services.getUserByEmailOrUsername(email);
          if (thisUser) {
            done(null, thisUser);
          } else {
            const newUser = await services.createNewUser(
              email.split('@')[0],
              email,
              null,
            );
            done(null, newUser.rows[0]);
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    ),
  );
};
