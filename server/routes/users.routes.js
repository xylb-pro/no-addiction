const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const passport = require('passport');

const { usersController } = require('../controllers');

router.get('/', usersController.getAllUsers);
router.get('/currentUser', auth, usersController.getUserById);
router.put(
  '/updateCurrentCategory',
  auth,
  usersController.updateCurrentUserCategory
);
router.put('/updateUserPassword', auth, usersController.updateUserHashPassword);

module.exports = router;
