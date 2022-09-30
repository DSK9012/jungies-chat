import { socket } from 'helpers/socket';
import { IStore, MessageStatusTypes } from 'helpers/types';
import { Actions } from './action-types';

export const userInfoReducer = (prevState: IStore, action: Actions): IStore => {
  switch (action.type) {
    case 'AUTHENTICATED': {
      return {
        ...prevState,
        userInfo: {
          ...prevState.userInfo,
          isAuthenticated: true,
          isLoading: false,
          hasError: false,
          ...action.payload,
        },
      };
    }

    case 'USER_LOADING': {
      return { ...prevState, userInfo: { ...prevState.userInfo, isLoading: true } };
    }

    case 'HAS_ERROR': {
      return { ...prevState, userInfo: { ...prevState.userInfo, isLoading: false, hasError: true } };
    }

    case 'GET_USER': {
      return {
        ...prevState,
        userInfo: { ...prevState.userInfo, isLoading: false, hasError: false, ...action.payload },
      };
    }

    case 'CONTACTS_LOADING': {
      return {
        ...prevState,
        userInfo: { ...prevState.userInfo, contacts: { ...prevState.userInfo.contacts, isLoading: true } },
      };
    }

    case 'CONTACTS_HAS_ERROR': {
      return {
        ...prevState,
        userInfo: {
          ...prevState.userInfo,
          contacts: { ...prevState.userInfo.contacts, isLoading: false, hasError: true },
        },
      };
    }

    case 'GET_CONTACTS': {
      return {
        ...prevState,
        userInfo: {
          ...prevState.userInfo,
          contacts: { ...prevState.userInfo.contacts, isLoading: false, hasError: false, data: action.payload },
        },
      };
    }

    case 'MESSAGES_LOADING': {
      const updatedContacts = [...prevState.userInfo.contacts.data];
      const selectedUserIndex = prevState.userInfo.contacts.data.findIndex(
        (user) => user.contactUserId === action.payload.contactUserId
      );
      updatedContacts[selectedUserIndex] = {
        ...updatedContacts[selectedUserIndex],
        messages: {
          ...updatedContacts[selectedUserIndex].messages,
          isLoading: true,
        },
      };
      return {
        ...prevState,
        userInfo: { ...prevState.userInfo, contacts: { ...prevState.userInfo.contacts, data: updatedContacts } },
      };
    }

    case 'MESSAGES_HAS_ERROR': {
      return prevState;
    }

    case 'GET_MESSAGES': {
      return prevState;
    }

    case 'SEARCH_USERS_LOADING': {
      return {
        ...prevState,
        searchedUsers: { ...prevState.searchedUsers, isLoading: prevState.searchedUsers.data.length === 0 },
      };
    }

    case 'SEARCH_USERS_ERROR': {
      return {
        ...prevState,
        searchedUsers: { ...prevState.searchedUsers, isLoading: false, hasError: true },
      };
    }

    case 'GET_SEARCH_USERS': {
      return {
        ...prevState,
        searchedUsers: { ...prevState.searchedUsers, isLoading: false, hasError: false, data: action.payload },
      };
    }

    case 'SELECT_CONTACT': {
      return {
        ...prevState,
        selectedUser: action.payload,
      };
    }

    case 'SELECT_NEW_CONTACT': {
      return {
        ...prevState,
        userInfo: {
          ...prevState.userInfo,
          contacts: {
            ...prevState.userInfo.contacts,
            data: [action.payload, ...prevState.userInfo.contacts.data],
          },
        },
        selectedUser: action.payload,
      };
    }

    case 'SEND_MESSAGE': {
      const date = new Date().toISOString();
      const message = {
        _id: '',
        chatId: prevState.selectedUser?._id || '',
        sentBy: {
          name: prevState.userInfo.name,
          userId: prevState.userInfo._id,
        },
        sentTo: {
          name: prevState.selectedUser?.name || '',
          userId: prevState.selectedUser?.contactUserId || '',
        },
        message: action.payload,
        status: MessageStatusTypes.WAITING,
        createdAt: date,
        updatedAt: date,
        usersReadMessage: [],
      };
      const contacts = [...prevState.userInfo.contacts.data];
      const contactIndex = prevState.userInfo.contacts.data.findIndex(
        (contact) => contact.contactUserId === prevState.selectedUser?.contactUserId
      );
      const messages = [...contacts[contactIndex].messages.data];
      messages.push(message);
      socket.emit('message', message);
      const user = {
        ...contacts[contactIndex],
        lastMessage: action.payload,
        lastUpdatedBy: prevState.userInfo._id,
        updatedAt: date,
        unreadNotifications: (prevState.selectedUser?.unreadNotifications ?? 0) + 1,
        messages: { ...contacts[contactIndex].messages, data: messages },
      };
      if (!contacts.length) {
        contacts.push(user);
      } else {
        contacts.splice(contactIndex, 1);
        contacts.unshift(user);
      }

      return {
        ...prevState,
        userInfo: { ...prevState.userInfo, contacts: { ...prevState.userInfo.contacts, data: contacts } },
        selectedUser: user,
      };
    }

    case 'UPDATE_NEW_CONTACT': {
      const { newContact, newMessage } = action.payload;
      const contacts = [...prevState.userInfo.contacts.data];
      const contactIndex = contacts.findIndex((contact) => contact.contactUserId === newMessage.sentTo.userId);
      if (contactIndex !== -1) {
        const msgs = [...contacts[contactIndex].messages.data];
        const msgIndex = msgs.findIndex((msg) => msg.chatId === '');
        msgs[msgIndex]._id = newMessage._id;
        msgs[msgIndex].chatId = newMessage.chatId;
        msgs[msgIndex].status = newMessage.status;
        contacts[contactIndex] = {
          ...newContact,
          messages: {
            ...contacts[contactIndex].messages,
            data: msgs,
          },
          unreadNotifications: contacts[contactIndex].unreadNotifications + 1,
        };
        return {
          ...prevState,
          userInfo: { ...prevState.userInfo, contacts: { ...prevState.userInfo.contacts, data: contacts } },
          selectedUser:
            prevState.selectedUser?.contactUserId === newMessage.sentTo.userId
              ? contacts[contactIndex]
              : prevState.selectedUser,
        };
      }
      return prevState;
    }

    case 'ADD_NEW_CONTACT': {
      const { newContact, newMessage } = action.payload;
      const contacts = [...prevState.userInfo.contacts.data];
      const contactIndex = contacts.findIndex(
        (contact) => contact.contactUserId === newContact.contactUserId || contact.contactUserId === newContact.userId
      );
      if (contactIndex !== -1) {
        const msgs = [...contacts[contactIndex].messages.data];
        msgs.push(newMessage);
        contacts[contactIndex] = {
          ...newContact,
          unreadNotifications: contacts[contactIndex].unreadNotifications + 1,
          messages: {
            ...contacts[contactIndex].messages,
            data: msgs,
          },
        };

        return {
          ...prevState,
          userInfo: { ...prevState.userInfo, contacts: { ...prevState.userInfo.contacts, data: contacts } },
          selectedUser:
            prevState.selectedUser?.contactUserId === newContact.contactUserId ||
            prevState.selectedUser?.contactUserId === newContact.userId
              ? contacts[contactIndex]
              : prevState.selectedUser,
        };
      }
      const isSelf = prevState.userInfo._id === newMessage.sentBy.userId;
      contacts.unshift({
        ...newContact,
        userId: isSelf ? newContact.userId : newContact.contactUserId,
        contactUserId: isSelf ? newContact.contactUserId : newContact.userId,
        name: isSelf ? newContact.name : newMessage.sentBy.name,
        messages: {
          isLoading: false,
          hasError: false,
          data: [newMessage],
        },
        unreadNotifications: 1,
      });
      return {
        ...prevState,
        userInfo: { ...prevState.userInfo, contacts: { ...prevState.userInfo.contacts, data: contacts } },
      };
    }

    case 'MESSAGE_SENT': {
      const newMessage = action.payload;
      const contacts = [...prevState.userInfo.contacts.data];
      const contactIndex = contacts.findIndex((contact) => contact._id === action.payload.chatId);
      if (contactIndex !== -1) {
        const msgs = [...contacts[contactIndex].messages.data];
        const msgIndex = msgs.findIndex((msg) => msg._id === '');
        if (msgIndex === -1) {
          msgs.push(newMessage);
        } else {
          msgs[msgIndex] = newMessage;
        }
        contacts[contactIndex] = {
          ...contacts[contactIndex],
          lastMessage: newMessage.message,
          lastUpdatedBy: newMessage.sentBy.userId,
          unreadNotifications: contacts[contactIndex].unreadNotifications + 1,
          updatedAt: newMessage.updatedAt,
          messages: {
            ...contacts[contactIndex].messages,
            data: msgs,
          },
        };

        return {
          ...prevState,
          userInfo: { ...prevState.userInfo, contacts: { ...prevState.userInfo.contacts, data: contacts } },
          selectedUser:
            prevState.selectedUser?._id === contacts[contactIndex]._id
              ? contacts[contactIndex]
              : prevState.selectedUser,
        };
      }
      return prevState;
    }

    case 'MESSAGE_DELIVERED': {
      const newMessage = action.payload;
      const contacts = [...prevState.userInfo.contacts.data];
      const contactIndex = contacts.findIndex((contact) => contact._id === action.payload.chatId);
      if (contactIndex !== -1) {
        const msgs = [...contacts[contactIndex].messages.data];
        const msgIndex = msgs.findIndex((msg) => msg._id === newMessage._id);
        msgs[msgIndex] = newMessage;
        contacts[contactIndex] = {
          ...contacts[contactIndex],
          lastMessage: newMessage.message,
          lastUpdatedBy: newMessage.sentBy.userId,
          unreadNotifications: contacts[contactIndex].unreadNotifications + 1,
          updatedAt: newMessage.updatedAt,
          messages: {
            ...contacts[contactIndex].messages,
            data: msgs,
          },
        };

        return {
          ...prevState,
          userInfo: { ...prevState.userInfo, contacts: { ...prevState.userInfo.contacts, data: contacts } },
          selectedUser:
            prevState.selectedUser?._id === contacts[contactIndex]._id
              ? contacts[contactIndex]
              : prevState.selectedUser,
        };
      }
      return prevState;
    }

    case 'MESSAGE': {
      const newMessage = action.payload;
      const contacts = [...prevState.userInfo.contacts.data];
      const contactIndex = contacts.findIndex((contact) => contact._id === action.payload.chatId);
      if (contactIndex !== -1) {
        const msgs = [...contacts[contactIndex].messages.data];
        msgs.push(newMessage);
        const contact = {
          ...contacts[contactIndex],
          lastMessage: newMessage.message,
          lastUpdatedBy: newMessage.sentBy.userId,
          unreadNotifications: contacts[contactIndex].unreadNotifications + 1,
          updatedAt: newMessage.updatedAt,
          messages: {
            ...contacts[contactIndex].messages,
            data: msgs,
          },
        };
        contacts.splice(contactIndex, 1);
        contacts.unshift(contact);

        return {
          ...prevState,
          userInfo: { ...prevState.userInfo, contacts: { ...prevState.userInfo.contacts, data: contacts } },
          selectedUser:
            prevState.selectedUser?._id === contacts[contactIndex]._id
              ? contacts[contactIndex]
              : prevState.selectedUser,
        };
      }
      return prevState;
    }

    default:
      return prevState;
  }
};
