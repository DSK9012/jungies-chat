const mongoose = require('mongoose');

const contactEntity = mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
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
    active: {
      type: Boolean,
      required: true,
    },
    lastActive: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('contacts', contactEntity);
