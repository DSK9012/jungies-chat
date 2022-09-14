import { IUserInfo } from 'helpers/types';
import { Actions } from './action-types';

export const userInfoReducer = (prevState: IUserInfo, action: Actions): IUserInfo => {
  switch (action.type) {
    case 'USER_LOADING': {
      return { ...prevState, isLoading: true };
    }

    case 'HAS_ERROR': {
      return { ...prevState, isLoading: false, hasError: true };
    }

    case 'GET_USER': {
      return { ...prevState, isLoading: false, hasError: false, ...action.payload };
    }

    case 'AUTHENTICATED': {
      return { ...prevState, isAuthenticated: true, isLoading: false, hasError: false, ...action.payload };
    }

    case 'CONTACTS_LOADING': {
      return { ...prevState, contacts: { ...prevState.contacts, isLoading: true } };
    }

    case 'CONTACTS_HAS_ERROR': {
      return { ...prevState, contacts: { ...prevState.contacts, isLoading: false, hasError: true } };
    }

    case 'GET_CONTACTS': {
      return {
        ...prevState,
        contacts: { ...prevState.contacts, isLoading: false, hasError: false, data: action.payload },
      };
    }

    case 'MESSAGES_LOADING': {
      const updatedContacts = [...prevState.contacts.data];
      const selectedUserIndex = prevState.contacts.data.findIndex(
        (user) => user.contactUserId === action.payload.contactUserId
      );
      updatedContacts[selectedUserIndex] = {
        ...updatedContacts[selectedUserIndex],
        messages: {
          ...updatedContacts[selectedUserIndex].messages,
          isLoading: true,
        },
      };
      return { ...prevState, contacts: { ...prevState.contacts, data: updatedContacts } };
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
        contacts: {
          ...prevState.contacts,
          data: [action.payload, ...prevState.contacts.data],
        },
      };
    }

    case 'UPDATE_CONTACT': {
      return prevState;
    }

    case 'SET_MESSAGE': {
      const userIndex = prevState.contacts.data.findIndex(
        (contact) => contact.contactUserId === action.payload.contactUserId
      );
      const contacts = [...prevState.contacts.data];
      if (userIndex !== -1) {
        contacts.splice(userIndex, 1);
        contacts.unshift(action.payload);
      } else {
        contacts[userIndex] = action.payload;
      }

      return { ...prevState, contacts: { ...prevState.contacts, data: contacts } };
    }

    case 'UPDATE_MESSAGE': {
      return prevState;
    }

    default:
      return prevState;
  }
};
