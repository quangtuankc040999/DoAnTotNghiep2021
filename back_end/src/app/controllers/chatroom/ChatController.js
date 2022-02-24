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
    // const notification = await Notification.findOne({ room: req.body.room });
    // let listContent = notification.listContent;
    // for (let content of listContent) {
    //   if (JSON.stringify(user._id) != JSON.stringify(content.member._id)) {
    //     content.count += 1;
    //     content.unreadCount += 1;
    //     content.contents.push({
    //       message: chat.message,
    //       createdBy: chat.createdBy,
    //     });
    //   }
    // }
    // await Notification.findByIdAndUpdate(notification._id, {
    //   listContent: listContent,
    // });
    return apiResponse.successResponseWithData(
      res,
      'Create chat successfully',
      chat,
    );
  };
  getAllNotifications = async (req, res) => {
    const room = await Room.findById(req.params.idRoom)
    const user = await User.findById(host(req, res));
    const notifications = await Notification.find({ isRead: false, room: room, createdBy: { $not: user } }).sort({ createdAt: 1 });
    return apiResponse.successResponseWithData(
      res,
      'Get all notifications successfully',
    );
  };
  updateNotification = async (req, res) => {
    const room = await Room.findById(req.params.idRoom)
    const user = await User.findById(host(req, res));
    const notifications = await Notification.findOneAndUpdate({ room: room, createdBy: { $not: user } }, {
      $set: {
        isRead: true
      }
    }).sort({ createdAt: 1 });
    return apiResponse.successResponse(
      res,
      'Update all notifications successfully',
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
