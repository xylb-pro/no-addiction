const express = require('express');
const router = express.Router();

const { categoriesController } = require('../controllers');

const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware, categoriesController.getCategoriesWithCurrent);
router.post(
  '/update',
  authMiddleware,
  categoriesController.updateCurrentCategory,
);

module.exports = router;
