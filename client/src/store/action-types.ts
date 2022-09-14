import { IContact, IMessage, IUser } from 'helpers/types';

export type Actions =
  | { type: 'USER_LOADING' }
  | { type: 'HAS_ERROR' }
  | { type: 'AUTHENTICATED'; payload: IUser }
  | { type: 'GET_USER'; payload: IUser }
  | { type: 'CONTACTS_LOADING' }
  | { type: 'CONTACTS_HAS_ERROR' }
  | { type: 'GET_CONTACTS'; payload: IContact[] }
  | { type: 'SET_CONTACT'; payload: IContact }
  | { type: 'UPDATE_CONTACT'; payload: IContact }
  | { type: 'MESSAGES_LOADING'; payload: IContact }
  | { type: 'MESSAGES_HAS_ERROR' }
  | { type: 'GET_MESSAGES'; payload: IMessage[] }
  | { type: 'SET_MESSAGE'; payload: IMessage }
  | { type: 'UPDATE_MESSAGE'; payload: IMessage };
