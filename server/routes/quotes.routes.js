const express = require('express');
const router = express.Router();

const { quotesController } = require('../controllers');

router.get('/', quotesController.getQuotes);

module.exports = router;
