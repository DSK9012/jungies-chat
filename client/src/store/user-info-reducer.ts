import { socket } from 'helpers/socket';
import { IStore, MessageStatusTypes } from 'helpers/types';
import { Actions } from './action-types';

export const userInfoReducer = (prevState: IStore, action: Actions): IStore => {
  switch (action.type) {
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

    case 'SET_CONTACT': {
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

    case 'UPDATE_NEW_CONTACT': {
      const { newContact, newMessage } = action.payload;
      const contacts = [...prevState.userInfo.contacts.data];
      const index = contacts.findIndex((contact) => contact.id === '');
      if (index !== -1) {
        const msgs = [...contacts[index].messages.data];
        const msgIndex = msgs.findIndex((msg) => msg.chatId === '');
        msgs[msgIndex].id = newMessage._id;
        msgs[msgIndex].chatId = newMessage.chatId;
        msgs[msgIndex].status = newMessage.status;
        contacts[index] = {
          ...contacts[index],
          id: newContact._id,
          messages: {
            ...contacts[index].messages,
            data: msgs,
          },
        };
        return {
          ...prevState,
          userInfo: { ...prevState.userInfo, contacts: { ...prevState.userInfo.contacts, data: contacts } },
          selectedUser: prevState.selectedUser?.id === '' ? contacts[index] : prevState.selectedUser,
        };
      }
      return prevState;
    }

    case 'UPDATE_CONTACT': {
      const newMessage = action.payload;
      const contacts = [...prevState.userInfo.contacts.data];
      const contactIndex = contacts.findIndex((contact) => contact.id === action.payload.chatId);
      if (contactIndex !== -1) {
        const msgs = [...contacts[contactIndex].messages.data];
        const msgIndex = msgs.findIndex((msg) => msg.id === '');
        msgs[msgIndex].id = newMessage._id;
        msgs[msgIndex].status = newMessage.status;
        contacts[contactIndex] = {
          ...contacts[contactIndex],
          messages: {
            ...contacts[contactIndex].messages,
            data: msgs,
          },
        };

        return {
          ...prevState,
          userInfo: { ...prevState.userInfo, contacts: { ...prevState.userInfo.contacts, data: contacts } },
          selectedUser:
            prevState.selectedUser?.id === contacts[contactIndex].id ? contacts[contactIndex] : prevState.selectedUser,
        };
      }

      return prevState;
    }

    case 'SET_MESSAGE': {
      const userIndex = prevState.userInfo.contacts.data.findIndex(
        (contact) => contact.contactUserId === action.payload.contactUserId
      );
      const contacts = [...prevState.userInfo.contacts.data];
      if (userIndex !== -1) {
        contacts.splice(userIndex, 1);
        contacts.unshift(action.payload);
      } else {
        contacts[userIndex] = action.payload;
      }

      return {
        ...prevState,
        userInfo: { ...prevState.userInfo, contacts: { ...prevState.userInfo.contacts, data: contacts } },
      };
    }

    case 'UPDATE_MESSAGE': {
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

    case 'SET_SELECTED_USER': {
      return {
        ...prevState,
        selectedUser: action.payload,
      };
    }

    case 'SEND_MESSAGE': {
      const date = new Date().toISOString();
      const message = {
        id: '',
        chatId: prevState.selectedUser?.id || '',
        sentBy: {
          name: prevState.userInfo.name,
          userId: prevState.userInfo.id,
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
        messages: { ...contacts[contactIndex].messages, data: messages },
      };
      if (contactIndex !== -1) {
        contacts.splice(contactIndex, 1);
        contacts.unshift(user);
      } else {
        contacts[contactIndex] = user;
      }

      return {
        ...prevState,
        userInfo: { ...prevState.userInfo, contacts: { ...prevState.userInfo.contacts, data: contacts } },
        selectedUser: user,
      };
    }

    case 'MESSAGE_SENT': {
      const newMessage = action.payload;
      const contacts = [...prevState.userInfo.contacts.data];
      const contactIndex = contacts.findIndex((contact) => contact.id === action.payload.chatId);
      if (contactIndex !== -1) {
        const msgs = [...contacts[contactIndex].messages.data];
        const msgIndex = msgs.findIndex((msg) => msg.id === '');
        if (msgIndex === -1) {
          msgs.push({ ...newMessage, id: newMessage._id });
        } else {
          msgs[msgIndex] = { ...newMessage, id: newMessage._id, status: newMessage.status };
        }
        contacts[contactIndex] = {
          ...contacts[contactIndex],
          lastMessage: newMessage.message,
          messages: {
            ...contacts[contactIndex].messages,
            data: msgs,
          },
        };

        return {
          ...prevState,
          userInfo: { ...prevState.userInfo, contacts: { ...prevState.userInfo.contacts, data: contacts } },
          selectedUser:
            prevState.selectedUser?.id === contacts[contactIndex].id ? contacts[contactIndex] : prevState.selectedUser,
        };
      }
      return prevState;
    }

    default:
      return prevState;
  }
};
