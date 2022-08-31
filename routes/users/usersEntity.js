const mongoose = require('mongoose');

const userEntity = mongoose.Schema({
  name: {
    type: String,
    default: '',
    require: true,
    trim: true,
  },
  email: {
    type: String,
    default: '',
    trim: true,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    require: true,
    default: '',
  },
  avatar: {
    type: Buffer,
    trim: true,
    default: '',
    alias: 'userImage',
  },
});

module.exports = mongoose.model('users', userEntity);
