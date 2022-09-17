const mongoose = require('mongoose');

const contactEntity = mongoose.Schema(
  {
    chatType: {
      type: String,
      required: true,
      enum: ['PRIVATE', 'GROUP'],
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    users: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: 'users',
        },
        name: {
          type: String,
          require: true,
          trim: true,
        },
      },
    ],
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    lastMessage: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('contacts', contactEntity);
