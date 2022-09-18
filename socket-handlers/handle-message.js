const Contact = require('../routes/contacts/contactEntity');
const Message = require('../routes/messages/messageEntity');

const handleMessage = async (socket, msg) => {
  if (!msg.chatId) {
    // add new contact
    try {
      const users = [
        {
          userId: socket.user.id,
          name: socket.user.name,
        },
        {
          userId: msg.sentTo.userId,
          name: msg.sentTo.name,
        },
      ];
      const newContact = new Contact({
        chatType: 'PRIVATE',
        createdBy: socket.user.id,
        users,
        lastUpdatedBy: socket.user.id,
        lastMessage: msg.message,
      });
      await newContact.save();
      const newMessage = new Message({
        chatId: newContact._id,
        sentBy: {
          userId: socket.user.id,
          name: socket.user.name,
        },
        sentTo: {
          userId: msg.sentTo.userId,
          name: msg.sentTo.name,
        },
        message: msg.message,
        status: 'SENT',
        usersReadMessage: [],
      });
      await newMessage.save();
      // inform sending user with updated details
      socket.emit('new-contact-updated', { newContact, newMessage });
      // inform opponent with new contact
      socket.to(socket.user.id).to(msg.sentTo.userId).emit('new-contact', { newContact, newMessage });
    } catch (error) {
      console.log(error);
    }
  } else {
    // update contact
    const existedContact = await Contact.findById(msg.chatId);
    existedContact.lastUpdatedBy = socket.user.id;
    existedContact.lastMessage = msg.message;
    await existedContact.save();
    // add msg
    const newMessage = new Message({
      chatId: msg.chatId,
      sentBy: {
        userId: socket.user.id,
        name: socket.user.name,
      },
      sentTo: {
        userId: msg.sentTo.userId,
        name: msg.sentTo.name,
      },
      message: msg.message,
      status: 'SENT',
      usersReadMessage: [],
    });
    await newMessage.save();
    socket.emit('message-sent', newMessage);
    socket.to(socket.user.id).to(msg.sentTo.userId).emit('new-message', newMessage);
  }
  socket.to(socket.user.id).to(msg.sentTo.userId).emit('message', msg);
};

module.exports = {
  handleMessage,
};
