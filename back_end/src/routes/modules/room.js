const express = require('express');
const router = express.Router();
const roomController = require('../../app/controllers/chatroom/RoomController');

router.get('/', roomController.getRoomChatByUserId);
module.exports = router;