import { IContact, IMessage, IServerContact, IServerMessage, IUser } from 'helpers/types';

export type Actions =
  | { type: 'USER_LOADING' }
  | { type: 'HAS_ERROR' }
  | { type: 'AUTHENTICATED'; payload: IUser }
  | { type: 'GET_USER'; payload: IUser }
  | { type: 'CONTACTS_LOADING' }
  | { type: 'CONTACTS_HAS_ERROR' }
  | { type: 'GET_CONTACTS'; payload: IContact[] }
  | { type: 'SET_CONTACT'; payload: IContact }
  | { type: 'UPDATE_CONTACT'; payload: IServerMessage }
  | { type: 'UPDATE_NEW_CONTACT'; payload: { newContact: IServerContact; newMessage: IServerMessage } }
  | { type: 'MESSAGES_LOADING'; payload: IContact }
  | { type: 'MESSAGES_HAS_ERROR' }
  | { type: 'GET_MESSAGES'; payload: IServerMessage[] }
  | { type: 'SET_MESSAGE'; payload: IContact }
  | { type: 'UPDATE_MESSAGE'; payload: IMessage }
  | { type: 'SEARCH_USERS_LOADING' }
  | { type: 'SEARCH_USERS_ERROR' }
  | { type: 'GET_SEARCH_USERS'; payload: IContact[] }
  | { type: 'SET_SELECTED_USER'; payload: IContact }
  | { type: 'SEND_MESSAGE'; payload: string }
  | { type: 'MESSAGE_SENT'; payload: IServerMessage };
