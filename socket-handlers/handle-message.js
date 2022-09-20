const Contact = require('../routes/contacts/contactEntity');
const Message = require('../routes/messages/messageEntity');
const User = require('../routes/users/usersEntity');

const handleMessage = async (socket, message) => {
  console.log(message);
  if (!message.chatId) {
    handleNewContactMessage(socket, message);
  } else {
    handleExistedContactMessage(socket, message);
  }
};

const handleNewContactMessage = async (socket, message) => {
  try {
    const users = [
      {
        userId: socket.user._id,
        name: socket.user.name,
      },
      {
        userId: message.sentTo.userId,
        name: message.sentTo.name,
      },
    ];
    const newContact = new Contact({
      chatType: 'PRIVATE',
      createdBy: socket.user._id,
      users,
      lastUpdatedBy: socket.user._id,
      lastMessage: message.message,
    });
    await newContact.save();
    const newMessage = new Message({
      chatId: newContact._id,
      sentBy: {
        userId: socket.user._id,
        name: socket.user.name,
      },
      sentTo: {
        userId: message.sentTo.userId,
        name: message.sentTo.name,
      },
      message: message.message,
      status: 'SENT',
      usersReadMessage: [],
    });
    await newMessage.save();
    // inform sending user with updated details
    const user = await User.findById(message.sentTo.userId);
    const contact = {
      ...newContact._doc,
      userId: newMessage.sentBy.userId,
      contactUserId: newMessage.sentTo.userId,
      name: newMessage.sentTo.name,
      active: user.active,
      lastActive: user.lastActive,
    };
    socket.emit('update-new-contact', {
      newContact: contact,
      newMessage,
    });
    // inform opponent with new contact
    socket.to(socket.user._id).to(message.sentTo.userId).emit('add-new-contact', { newContact: contact, newMessage });
  } catch (error) {
    console.log(error);
  }
};

const handleExistedContactMessage = async (socket, message) => {
  // update contact
  try {
    const existedContact = await Contact.findById(message.chatId);
    existedContact.lastUpdatedBy = socket.user._id;
    existedContact.lastMessage = message.message;
    await existedContact.save();
    // add message
    const newMessage = new Message({
      chatId: message.chatId,
      sentBy: {
        userId: socket.user._id,
        name: socket.user.name,
      },
      sentTo: {
        userId: message.sentTo.userId,
        name: message.sentTo.name,
      },
      message: message.message,
      status: 'SENT',
      usersReadMessage: [],
    });
    await newMessage.save();
    socket.emit('message-sent', newMessage);
    socket.to(socket.user._id).to(message.sentTo.userId).emit('message', newMessage);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleMessage,
};
