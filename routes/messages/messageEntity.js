const mongoose = require('mongoose');

const messageEntity = mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    sentBy: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },
    sentTo: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['SENT', 'DELIVERED', 'READ'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('contacts', messageEntity);
