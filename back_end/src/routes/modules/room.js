const express = require('express');
const router = express.Router();
const roomController = require('../../app/controllers/chatroom/RoomController');

router.get('/', roomController.getRoomChatByUserId);
router.get('/all-room/', roomController.getAllRoomChat)
router.put('/', roomController.updateRoom )
module.exports = router;