const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notification = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
    isRead: {type: Boolean, default: false},
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Notification', Notification, 'Notification');
