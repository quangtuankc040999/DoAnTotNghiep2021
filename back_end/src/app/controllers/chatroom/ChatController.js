const Chat = require('../../models/Chat');
const Notification = require('../../models/Notification');
const User = require('../../models/User');
const apiResponse = require('../../../utils/apiResponse');
const host = require('../../../utils/decodeJWT');
const Room = require('../../models/Room');
require('dotenv').config();

class ChatController {
  getAllChats = async (req, res) => {
    const chats = await Chat.find().sort({ createdAt: 1 });
    return apiResponse.successResponseWithData(
      res,
      'Get all chats successfully',
      chats,
    );
  };
  getChatByRoomId = async (req, res) => {
    const chat = await Chat.find({ room: req.params.idRoom })
      .populate('createdBy')
      .sort({ createdAt: 1 });
    return apiResponse.successResponseWithData(
      res,
      'Get chat successfully',
      chat,
    );
  };

  createChat = async (req, res) => {
    let chat = req.body.chat;
    const user = await User.findById(host(req, res));
    const room = await Room.findById(req.body.chat.idRoom)
    let chatParams = new Chat(chat);
    chatParams.createdBy = user;
    chatParams.room = room;
    const newChat = await Chat.create(chatParams);
    const notification = new Notification();
    notification.createdBy = user;
    notification.room = room;
    const newNotification = await Notification.create(notification)
    return apiResponse.successResponseWithData(
      res,
      'Create chat successfully',
      chat,
    );
  };
  getAllNotifications = async (req, res) => {
    const room = await Room.findById(req.params.idRoom)
    const user = await User.findById(host(req, res));
    const notifications = await Notification.find({ isRead: false, room: room, createdBy: { $ne: user } }).sort({ createdAt: 1 });
    return apiResponse.successResponseWithData(
      res,
      'Get all notifications successfully',
      notifications
    );
  };
  updateNotification = async (req, res) => {
    const room = await Room.findById(req.params.idRoom)
    const user = await User.findById(host(req, res));
    const notifications = await Notification.find({ room: room, createdBy: { $ne: user } });
    for (let no of notifications) {
      await Notification.findByIdAndUpdate(no._id, { isRead: true })
    }
    return apiResponse.successResponse(
      res,
      'Update all notifications successfully',
    );
  };
  // -------------
  getAllNotificationsAdmin = async (req, res) => {
    const user = await User.findById(host(req, res));
    const notifications = await Notification.find({ isRead: false, createdBy: { $ne: user } }).sort({ createdAt: 1 });
    return apiResponse.successResponseWithData(
      res,
      'Get all notifications successfully',
      notifications
    );
  };


  updateChat = async (req, res) => {
    const chat = await Chat.findByIdAndUpdate(req.params.id, req.body.chat);
    return apiResponse.successResponseWithData(
      res,
      'Update chat successfully',
      chat,
    );
  };

  deleteChat = async (req, res) => {
    await Chat.findByIdAndDelete(req.params.id);
    return apiResponse.successResponse(res, 'Delete chat successfully');
  };
}
module.exports = new ChatController();
