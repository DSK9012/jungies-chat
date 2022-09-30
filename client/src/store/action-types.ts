import { IContact, IMessage, IServerContact, IUser } from 'helpers/types';

export type Actions =
  | { type: 'AUTHENTICATED'; payload: IUser }
  | { type: 'USER_LOADING' }
  | { type: 'HAS_ERROR' }
  | { type: 'GET_USER'; payload: IUser }
  | { type: 'CONTACTS_LOADING' }
  | { type: 'CONTACTS_HAS_ERROR' }
  | { type: 'GET_CONTACTS'; payload: IContact[] }
  | { type: 'MESSAGES_LOADING'; payload: IContact }
  | { type: 'MESSAGES_HAS_ERROR' }
  | { type: 'GET_MESSAGES'; payload: IMessage[] }
  | { type: 'SEARCH_USERS_LOADING' }
  | { type: 'SEARCH_USERS_ERROR' }
  | { type: 'GET_SEARCH_USERS'; payload: IContact[] }
  | { type: 'SELECT_CONTACT'; payload: IContact }
  | { type: 'SELECT_NEW_CONTACT'; payload: IContact }
  | { type: 'SEND_MESSAGE'; payload: string }
  | { type: 'UPDATE_NEW_CONTACT'; payload: { newContact: IServerContact; newMessage: IMessage } }
  | { type: 'ADD_NEW_CONTACT'; payload: { newContact: IServerContact; newMessage: IMessage } }
  | { type: 'MESSAGE_SENT'; payload: IMessage }
  | { type: 'MESSAGE_DELIVERED'; payload: IMessage }
  | { type: 'MESSAGE'; payload: IMessage };
