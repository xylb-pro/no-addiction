//jwt
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//google oauth
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

const services = require('../services');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await services.getUserById(payload.userId);

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        throw new Error('Error with auth', error);
      }
    }),
  );

  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: process.env.GOOGLE_ID,
  //       clientSecret: process.env.GOOGLE_SECRET,
  //       callbackURL: 'auth/google/redirect',
  //     },
  //     (accessToken) => {
  //       console.log('token', accessToken);
  //     },
  //   ),
  // );
};
