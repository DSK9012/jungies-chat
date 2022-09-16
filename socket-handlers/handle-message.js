const mongoose = require('mongoose');
const User = require('./routes/users/userEntity');
const Contact = require('./routes/contacts/contactEntity');
const Message = require('./routes/messages/messageEntity');

const handleMessage = async (socket, msg) => {
  if (!msg.id && !msg.chatId) {
    // add new contact
    const chatId = mongoose.Types.ObjectId();
    msg.chatId = chatId;
    try {
      const user = await findById(msg.sentTo.userId).select('-password').select('-avatar');
      const newContact = new Contact({
        chatId,
        userId: msg.sentBy.userId,
        contactUserId: msg.sentTo.userId,
        name: msg.sentTo.name,
        lastMessage: msg.message,
        // unreadNotifications: user.active ?
      });
      await newContact.save();
    } catch (error) {}
  } else {
  }
  const findExistedContact = await Contact.findOne({ contactUserId: msg.sentTo.userId });
  if (findExistedContact) {
    // update contact
    // add msg
  }
  // add contact
  socket.to(socket.user.id).to(msg.sentTo.userId).emit('message', msg);
};

module.exports = {
  handleMessage,
};
