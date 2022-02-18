const express = require('express');
const router = express.Router();
const logController = require('../../app/controllers/LogController');
router.post('/', logController.createLog);
router.post('/out', logController.createLogXuat);
module.exports = router;