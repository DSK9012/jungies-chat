const mongoose = require('mongoose');

const contactEntity = mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    chatType,
    users,
    name,
    id,
    unreadMsgs,
    admin,
    lastUpdatedBy,
    lastMessage,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'users',
    },
    contactUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'users',
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    lastMessage: {
      type: String,
      trim: true,
      default: '',
    },
    unreadNotifications: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('contacts', contactEntity);
