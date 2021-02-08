const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { authController } = require('../controllers');

router.post('/login', authController.loginWithEmail);
router.post('/register', authController.registerWithEmail);
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
    accessType: 'offline',
    // approvalPrompt: 'force',
  }),
);
router.get(
  '/auth/google/redirect',
  passport.authenticate('google', { session: false }),
  authController.authWithGoogleJwt,
);

module.exports = router;
