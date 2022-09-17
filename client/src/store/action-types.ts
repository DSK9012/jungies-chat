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
  | { type: 'UPDATE_CONTACT'; payload: IContact }
  | { type: 'MESSAGES_LOADING'; payload: IContact }
  | { type: 'MESSAGES_HAS_ERROR' }
  | { type: 'GET_MESSAGES'; payload: IServerMessage[] }
  | { type: 'SET_MESSAGE'; payload: IContact }
  | { type: 'UPDATE_MESSAGE'; payload: IMessage };
