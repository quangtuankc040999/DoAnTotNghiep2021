const express = require('express');
const router = express.Router();
const chatController = require('../../app/controllers/chatroom/ChatController');
const server = require('http').createServer(express);
const server_port = 4000;

const io = require('socket.io')(server, {
    cors: {
      origin: `${process.env.URL}`,
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true,
    },
    allowEIO3: true,
  });

router.post('/', chatController.createChat);
router.get('/:idRoom', chatController.getChatByRoomId)
router.get('/notification/:idRoom', chatController.getAllNotifications)
router.put('/notification-update/:idRoom', chatController.updateNotification)
server.listen(server_port);

io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function () {
    console.log('User disconnected');
  });
  socket.on('save-message', function (data) {
    io.emit('new-message', { message: data });
  });
});
module.exports = router;