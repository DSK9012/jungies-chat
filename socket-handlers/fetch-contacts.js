const Contact = require('../routes/contacts/contactEntity');
const Message = require('../routes/messages/messageEntity');
const User = require('../routes/users/usersEntity');

const fetchContacts = async (socket) => {
  try {
    const contacts = await Contact.find({ 'users.userId': socket.user.id }).sort({ updatedAt: -1 });
    let modifiedContacts = [];
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      const contactMsgs = await Message.find({ chatId: contact._id }).sort({ createdAt: 1 });
      const socketUserIndex =
        contact.chatType.toLowerCase() === 'private'
          ? contact.users.findIndex((user) => user.userId.toString() === socket.user.id)
          : '';
      const contactUser = contact.users[socketUserIndex === 0 ? 1 : 0];
      const user = await User.findById(contactUser.userId).select('-password').select('-avatar');
      const createContact = {
        id: contact._id,
        chatType: contact.chatType,
        createdBy: contact.createdBy,
        users: contact.users,
        lastUpdatedBy: contact.lastUpdatedBy,
        userId: socket.user.id,
        contactUserId: contactUser.userId,
        name: contactUser.name,
        lastMessage: contact.lastMessage,
        messages: {
          isLoading: true,
          hasError: false,
          data: contactMsgs,
        },
        active: user.active,
        lastActive: user.lastActive,
        createdAt: contact.createdAt,
        updatedAt: contact.updatedAt,
      };
      // console.log(createContact);
      modifiedContacts.push(createContact);
    }
    // console.log(modifiedContacts);
    return modifiedContacts;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  fetchContacts,
};
