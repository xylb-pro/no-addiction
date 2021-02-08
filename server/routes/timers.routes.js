const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');

const { timersController } = require('../controllers');

router.get('/', auth, timersController.getAllTimers);
router.get('/records', auth, timersController.getRecordsList);
router.get('/current', auth, timersController.getCurrentTimer);
router.get('/last', auth, timersController.getLastTimer);
router.delete('/delete', auth, timersController.deleteTimerById);
router.put('/current/update', auth, timersController.updateCurrentTimerEndDate);
router.post('/current/create', auth, timersController.createNewCurrentDate);

module.exports = router;
